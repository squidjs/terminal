<template>
    <div class="nav" :style="'background-color: ' + background">
        <p class="title">Squid</p>
        <div class="buttons">
            <button @click="minimize" class="button"><svg height="10" width="10"><path d="M 0,5 10,5 10,6 0,6 Z"></path></svg></button>
            <button @click="maximize" class="button"><svg height="10" width="10"><path d="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"></path></svg></button>
            <button @click="close" class="button red"><svg height="10" width="10"><path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z"></path></svg></button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import { remote } from 'electron';
    import Options from '@/options/options';

    @Component
    export default class TopNav extends Vue {

        /**
         * Minimize the current window
         *
         * @returns void
         */
        private minimize(): void {

            remote.getCurrentWindow().minimize();
        }

        /**
         * Maximize or restore the current window
         *
         * @returns void
         */
        private maximize(): void {

            if(remote.getCurrentWindow().isMaximized())
                remote.getCurrentWindow().restore();
            else
                remote.getCurrentWindow().maximize();
        }

        /**
         * Close the current window
         *
         * @returns void
         */
        private close(): void {

            remote.getCurrentWindow().close();
        }

        /**
         * Computed method to get the
         * background color of the terminal
         *
         * @returns string
         */
        private get background(): string {

            return Options.get().getOptions().theme.background;
        }
    }
</script>

<style lang="scss">
    .nav {

        width: 100vw;
        height: 30px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;

        -webkit-app-region: drag;

        .title {

            margin: 0;
            color: #ffffff;
            line-height: 30px;
            padding: 0 10px;
            font-size: 12px;
        }

        .button {

            background: none;
            border: none;

            width: 50px;
            height: 30px;

            fill: #646464;

            transition: .3s ease;

            -webkit-app-region: no-drag;

            &:hover {

                cursor: pointer;

                fill: #ffffff;
            }
        }

        .button.red:hover {

            background-color: #c0392b;
        }
    }
</style>
