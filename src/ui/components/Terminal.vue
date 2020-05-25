<template>
    <div :id="'terminal-' + this.index" :class="!isActive ? 'hidden' : ''"></div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
    import AppTerminal from "@/app/appTerminal";

    @Component
    export default class Terminal extends Vue {

        @Prop()
        private readonly index!: number;

        @Prop()
        private readonly current!: number;

        // @ts-ignore
        private terminal: AppTerminal;

        /**
         * Create the terminal
         *
         * @return void
         */
        private mounted(): void {

            this.terminal = new AppTerminal(this.index);
        }

        private beforeDestroy(): void {

            this.terminal.onDestroy();
        }

        /**
         * Computed method to check if this terminal
         * is actually active
         *
         * @return boolean
         */
        private get isActive(): boolean {

            return this.current === this.index;
        }

        @Watch('current')
        private currentChanged(newVal: number): void {

            if(newVal === this.index) {

                setTimeout(() => {

                    this.terminal.focus();

                }, 100);
            }

        }
    }
</script>

<style lang="scss">
    .hidden {

        display: none;
    }

    .xterm {

        font-feature-settings: "liga" 0;
        position: relative;
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        padding: 15px;
    }

    .xterm.focus,
    .xterm:focus {

        outline: none;
    }

    .xterm .xterm-helpers {

        position: absolute;
        top: 0;
        z-index: 5;
    }

    .xterm .xterm-helper-textarea {

        position: absolute;
        opacity: 0;
        left: -9999em;
        top: 0;
        width: 0;
        height: 0;
        z-index: -5;
        white-space: nowrap;
        overflow: hidden;
        resize: none;
    }

    .xterm .composition-view {

        background: #000;
        color: #FFF;
        display: none;
        position: absolute;
        white-space: nowrap;
        z-index: 1;
    }

    .xterm .composition-view.active {

        display: block;
    }

    .xterm .xterm-viewport {

        background-color: #000;
        overflow-y: scroll;
        cursor: default;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
    }

    .xterm .xterm-screen {

        position: relative;
        width: calc(100vw - 30px) !important;
        height: calc(100vh - 30px - 30px - 30px - 20px) !important;
    }

    .xterm .xterm-screen canvas {

        position: absolute;
        left: 0;
        top: 0;
    }

    .xterm .xterm-scroll-area {

        visibility: hidden;
    }

    .xterm-char-measure-element {

        display: inline-block;
        visibility: hidden;
        position: absolute;
        top: 0;
        left: -9999em;
        line-height: normal;
    }

    .xterm {

        cursor: text;
    }

    .xterm.enable-mouse-events {

        cursor: default;
    }

    .xterm.xterm-cursor-pointer {

        cursor: pointer;
    }

    .xterm.column-select.focus {

        cursor: crosshair;
    }

    .xterm .xterm-accessibility,
    .xterm .xterm-message {

        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
        color: transparent;
    }

    .xterm .live-region {

        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }

    .xterm-dim {

        opacity: 0.5;
    }

    .xterm-underline {

        text-decoration: underline;
    }
</style>
