<template>
    <div class="bottom-nav" :style="'background-color: ' + background">
        <div class="group">
            <p>{{ this.activeMem }} MB ({{ this.percent }}%)</p>
            <div class="separator"></div>
            <p>{{ this.cpu }}% CPU</p>
        </div>
        <div class="group">
            <p>{{ this.uptime }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import system, { Systeminformation } from 'systeminformation';
    import os from 'os';
    import { formatUptime } from '@/utils/utils';
    import Options from "@/options/options";

    @Component
    export default class BottomNav extends Vue {

        private activeMem: number = 0;
        private totalMem: number = 0;
        private cpu: number = 0;
        private uptime: string = '';

        /**
         * Fetch the informations every 1s
         *
         * @return void
         */
        private mounted(): void {

            setInterval(() => this.fetchInformations(), 1000);
        }

        /**
         * Fetch the informations
         *
         * @return void
         */
        private fetchInformations(): void {

            this.fetchMemory();
            this.fetchCpu();
            this.fetchUptime();
        }

        /**
         * Fetch the memory
         *
         * @return void
         */
        private fetchMemory(): void {

            system.mem().then((result: Systeminformation.MemData) => {

                this.activeMem = this.toMb(result.active);
                this.totalMem = this.toMb(result.total);
            });
        }

        /**
         * Fetch the cpu
         *
         * @return void
         */
        private fetchCpu(): void {

            system.currentLoad().then((result: Systeminformation.CurrentLoadData) => {

                this.cpu = parseInt(result.currentload.toFixed(0));
            });
        }

        /**
         * Fetch the uptime
         *
         * @return void
         */
        private fetchUptime(): void {

            this.uptime = formatUptime(os.uptime());
        }

        /**
         * Get a percentage of the memory used
         *
         * @return string
         */
        private get percent(): string {

            return (this.activeMem * 100 / this.totalMem).toFixed(0).toString();
        }

        /**
         * Convert bytes to MB
         *
         * @param bytes
         * @return number
         */
        private toMb(bytes: number): number {

            return parseInt((bytes / 1048576).toFixed(0));
        }

        /**
         * Computed method to get the
         * background color of the terminal
         *
         * @return string
         */
        private get background(): string {

            return Options.get().getOptions().theme.background;
        }
    }
</script>

<style lang="scss">
    .bottom-nav {

        width: 100vw;
        height: 20px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .group {

            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .separator {

                border: 1px solid #212121;
                height: 10px;
            }
        }

        p {

            color: #646464;
            margin: 0 10px;
            font-size: 12px;
            font-weight: 100;
        }
    }
</style>
