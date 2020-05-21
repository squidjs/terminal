<template>
    <div @click.left="switchTab" :class="'tab ' + (isActive ? 'active' : '')" :id="'tab-' + this.index">Terminal {{ this.index }}</div>
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
         * Switch to tab
         *
         * @return void
         */
        private switchTab(): void {

            this.$emit('switch', this.index);
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
    }
</script>

<style lang="scss" scoped>
    .tab {

        color: #646464;
        text-align: center;
        font-size: 14px;
        width: 100%;
        cursor: pointer;

        &.active {

            color: #fff;
        }
    }
</style>
