<template>
    <div id="app" :style="'fontFamily: ' + fontFamily">
        <top-nav />
        <div @click.right.prevent="openContextMenu" class="main">
            <div class="tabs">
                <tab v-for="terminal in terminals" @switch="switchTab" @close="closeTab" :key="terminal.index" :index="terminal.index" :current="current" />
            </div>
            <terminal v-for="terminal in this.terminals" :key="terminal.index" :index="terminal.index" :current="current"/>
        </div>
        <bottom-nav />
        <div class="border" />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import TopNav from '@/ui/components/TopNav.vue';
    import BottomNav from '@/ui/components/BottomNav.vue';
    import { ipcRenderer, remote } from 'electron';
    import Tab from '@/ui/components/Tab.vue';
    import Terminal from '@/ui/components/Terminal.vue';
    import { ITerminal } from "@/app/appTerminal";
    import Options from "@/options/options";

    @Component({

        components: {

            TopNav,
            BottomNav,
            Tab,
            Terminal,
        }
    })
    export default class App extends Vue {

        private id: number = 0;
        private current: number = 0;
        private terminals: ITerminal[] = [];

        private isDevelopment = process.env.NODE_ENV !== 'production';

        /**
         * Create the default terminal
         *
         * @return void
         */
        private mounted(): void {

            // Open a new tab by default
            this.openTab();

            // Shortcuts
            ipcRenderer.on('shortcuts', (event, message) => {

                switch (message) {

                    case 'pane:open':
                        this.openTab();
                        break;

                    case 'pane:close':
                        this.closeCurrentTab();
                        break;

                    case 'pane:switch':
                        console.log('switch')
                        break;
                }
            });
        }

        /**
         * Open a tab
         *
         * @return void
         */
        private openTab(): void {

            this.terminals.push({

                index: ++this.id,
            });

            this.switchTab(this.id);
        }

        /**
         * Close the current tab
         *
         * @return void
         */
        private closeCurrentTab(): void {

            // Close the current tab
            this.closeTab(this.current);
        }

        /**
         * Switch tab
         *
         * @param number
         * @return void
         */
        private switchTab(id: number): void {

            this.current = id;
        }

        /**
         * Close the tab with the specified id
         *
         * @param number
         * @return void
         */
        private closeTab(id: number): void {

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
         * Open the context menu
         *
         * @return void
         */
        private openContextMenu(): void {

            ipcRenderer.send('contextmenu');
        }

        /**
         * Computed method to get the
         * fontFamily of the terminal
         *
         * @return string
         */
        private get fontFamily(): string {

            return Options.get().getOptions().font.family;
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
        border: 1px solid #646464;
        pointer-events: none;
        z-index: 100;
    }

    *:focus {

        outline: none;
    }

    .main {

        width: 100vw;
        height: calc(100vh - 30px - 20px);

        //background-color: #0F0F0F;
    }

    .tabs {

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 30px;
        border-bottom: 1px solid #212121;
        background-color: #0F0F0F;
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
