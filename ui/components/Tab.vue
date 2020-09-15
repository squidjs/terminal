<template>
    <div @click.left="switchTab" :class="'tab ' + (isActive ? 'active' : '')" :id="'tab-' + this.index">
        <p class="tab-title" :id="'tab-title-' + this.index">Terminal {{ this.index }}</p>
        <button @click="close" type="button" class="tab-close"><svg height="10" width="10"><path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z"></path></svg></button>
    </div>
</template>

<script lang="ts">
    import  { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export default class Tab extends Vue {

        @Prop()
        private readonly index!: number;

        @Prop()
        private readonly current!: number;

        /**
         * Switch to tab.
         */
        private switchTab() {

            this.$emit('switch', this.index);
        }

        /**
         * Computed method to check if this terminal
         * is actually active.
         *
         * @returns boolean
         */
        private get isActive(): boolean {

            return this.current === this.index;
        }

        /**
         * Close this terminal.
         */
        private close() {

            this.$emit('close', this.index);
        }
    }
</script>

<style lang="scss" scoped>
    .tab {

        color: #646464;
        text-align: center;
        font-size: 14px;
        width: 100%;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        white-space: nowrap;

        &.active {

            color: #fff;
        }

        .tab-close {

            border: none;
            background: none;
            fill: #646464;
            margin-left: 20px;
            cursor: pointer;

            &:hover {

                fill: #ffffff;
            }
        }
    }
</style>
