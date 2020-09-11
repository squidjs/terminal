<template>
    <div :id="'terminal-' + this.index" :class="!isActive ? 'hidden' : ''" :style="'opacity: ' + opacity"></div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
    import AppTerminal from '@/app/appTerminal';
    import Options from '@/options/options';

    @Component
    export default class Terminal extends Vue {

        @Prop()
        private readonly index!: number;

        @Prop()
        private readonly current!: number;

        // @ts-ignore
        private terminal: AppTerminal;

        /**
         * Create the terminal.
         */
        private mounted() {

            this.terminal = new AppTerminal(this.index);
        }

        /**
         * Called when this terminal will destroy.
         */
        private beforeDestroy() {

            this.terminal.onDestroy();
        }

        /**
         * Computed method to check if this terminal
         * is actually active.
         *
         * @returns Return true if this terminal is active
         */
        private get isActive(): boolean {

            return this.current === this.index;
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

        @Watch('current')
        private currentChanged(newVal: number) {

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

    .term {

        opacity: 1;
        //background-color: #0F0F0F;
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
        height: calc(100vh - 30px - 30px - 30px) !important;
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
