<template>
    <div id="app" :style="'fontFamily: ' + fontFamily">
        <top-nav />
        <div @click.right.prevent="openContextMenu" class="main">
            <div class="tabs" :style="{'background-color': background, 'border-color': border, 'opacity': opacity}">
                <tab v-for="terminal in terminals" @switch="switchTab" @close="closeTab" :key="terminal.index" :index="terminal.index" :current="current" />
            </div>
            <terminal v-for="terminal in this.terminals" :key="terminal.index" :index="terminal.index" :current="current"/>
        </div>
        <div class="border" :style="'border-color: ' + border" />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import TopNav from '@/ui/components/TopNav.vue';
    import { ipcRenderer, IpcRendererEvent, remote } from 'electron';
    import Tab from '@/ui/components/Tab.vue';
    import Terminal from '@/ui/components/Terminal.vue';
    import { ITerminal } from '@/app/appTerminal';
    import Options, { IShortcutType } from '@/options/options';

    @Component({

        components: {

            TopNav,
            Tab,
            Terminal,
        }
    })
    export default class App extends Vue {

        private current: number = 0;
        private terminals: ITerminal[] = [];

        private isDevelopment = process.env.NODE_ENV !== 'production';

        /**
         * Create the default terminal.
         */
        private mounted() {

            // Open a new tab by default
            this.openTab();

            // Shortcuts
            ipcRenderer.on('shortcuts', (event: IpcRendererEvent, message: IShortcutType, object: number | string) => {

                switch (message) {

                    case 'pane:open':
                        this.openTab();
                        break;

                    case 'pane:close':
                        if(object === 'current')
                            this.closeCurrentTab();
                        else if(typeof object === 'number')
                            this.closeTab(object);
                        break;

                    case 'pane:switchLeft':
                        this.switchTab(this.current - 1);
                        break;

                    case 'pane:switchRight':
                        this.switchTab(this.current + 1);
                        break;
                }
            });
        }

        /**
         * Open a tab.
         */
        private openTab() {

            // Find the terminal with the lowest index
            const lowestIndex: number = Math.min(...this.terminals.map(terminal => terminal.index));
            let index: number = (lowestIndex > 1 ? 1 : lowestIndex + 1);

            while(this.terminals.filter(terminal => terminal.index == index).length >= 1)
                index += 1;

            this.terminals.push({ index });

            this.switchTab(index);
        }

        /**
         * Close the current tab.
         */
        private closeCurrentTab() {

            // Close the current tab
            this.closeTab(this.current);
        }

        /**
         * Switch tab to specified tab id.
         *
         * @param id - The tab's id to switch to
         */
        private switchTab(id: number) {

            console.log('requested switch to tab ' + id);

            if(this.terminals.filter(terminal => terminal.index == id).length >= 1) {

                console.log('switched')
                this.current = id;
            }

        }

        /**
         * Close the tab with the specified id.
         *
         * @param id - The tab's id do close
         */
        private closeTab(id: number) {

            // Remove the terminal
            for(let i = 0; i < this.terminals.length; i++) {

                if(this.terminals[i].index === id) {

                    this.terminals.splice(i, 1);
                    break;
                }
            }

            if(this.terminals.length === 0 && !this.isDevelopment) {

                remote.getCurrentWindow().close();
                return;
            }

            // Find the terminal with the lowest index
            const newCurrent = Math.min(...this.terminals.map(terminal => terminal.index));

            // Set the new current terminal
            this.current = newCurrent;
        }

        /**
         * Open the context menu.
         */
        private openContextMenu() {

            ipcRenderer.send('contextmenu');
        }

        /**
         * Computed method to get the
         * fontFamily of the terminal.
         *
         * @returns The font family to use
         */
        private get fontFamily(): string {

            return Options.get().getOptions().font.family;
        }

        /**
         * Computed method to get the
         * background color of the terminal.
         *
         * @returns The background color
         */
        private get background(): string {

            return Options.get().getOptions().theme.background;
        }

        /**
         * Computed method to get the
         * border color of the terminal.
         *
         * @returns The border color
         */
        private get border(): string {

            return Options.get().getOptions().theme.border;
        }

        /**
         * Computed method to get the
         * opacity of the terminal.
         *
         * @returns The opacity number
         */
        private get opacity(): number {

            return Options.get().getOptions().opacity;
        }
    }
</script>

<style lang="scss">
    body {

        padding: 0;
        margin: 0;

        overflow-x: hidden;
        overflow-y: hidden;

        user-select: none;
    }

    .border {

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid;
        pointer-events: none;
        z-index: 100;
    }

    *:focus {

        outline: none;
    }

    .main {

        width: 100vw;
        height: calc(100vh - 30px);

        //background-color: #0F0F0F;
    }

    .tabs {

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 30px;
        border-bottom: 1px solid;
        overflow-x: scroll;
    }

    .tabs::-webkit-scrollbar {

        display: none;
    }

    ::-webkit-scrollbar {

        background: none;
        width: 10px;
    }

    ::-webkit-scrollbar-thumb:window-inactive, ::-webkit-scrollbar-thumb {

        background: #232a2d;
        border-radius: 5px;
    }
</style>
