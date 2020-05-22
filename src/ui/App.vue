<template>
    <div id="app">
        <top-nav />
        <div @click.right.prevent="openContextMenu" class="main">
            <div class="tabs">
                <tab v-for="terminal in terminals" @switch="switchTab" :key="terminal.index" :index="terminal.index" :current="current" />
            </div>
            <terminal v-for="terminal in this.terminals" :key="terminal.index" :index="terminal.index" :current="current"/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator';
    import TopNav from '@/ui/components/TopNav.vue';
    import { ipcRenderer, remote } from 'electron';
    import Tab from '@/ui/components/Tab.vue';
    import Terminal from '@/ui/components/Terminal.vue';
    import { ITerminal } from "@/app/appTerminal";

    @Component({

        components: {

            TopNav,
            Tab,
            Terminal,
        }
    })
    export default class App extends Vue {

        private id: number = 0;
        private current: number = 0;
        private terminals: ITerminal[] = [];

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

            // Remove the current terminal
            for(let i = 0; i < this.terminals.length; i++) {

                if(this.terminals[i].index === this.current)
                    this.terminals.splice(i, 1);
            }

            if(this.terminals.length === 0) {

                remote.getCurrentWindow().close();
                return;
            }

            // Find the terminal with the lowest index
            const newCurrent = Math.min(...this.terminals.map(terminal => terminal.index));

            // Set the new current terminal
            this.current = newCurrent;
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
         * Open the context menu
         *
         * @return void
         */
        private openContextMenu(): void {

            ipcRenderer.send('contextmenu');
        }
    }
</script>

<style lang="scss">
    body {

        padding: 0;
        margin: 0;

        overflow-x: hidden;
        overflow-y: hidden;

        font-family: 'Fira Code', monospace;
        font-feature-settings: "calt" 1;
        font-variant-ligatures: contextual;

        user-select: none;
    }

    *:focus {

        outline: none;
    }

    .main {

        width: 100vw;
        height: calc(100vh - 30px);

        background-color: #0F0F0F;
    }

    .tabs {

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 30px;
        border-bottom: 1px solid #646464;
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
