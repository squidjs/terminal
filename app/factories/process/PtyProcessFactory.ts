import { UndefinedObject } from '@common/types/types';
import { IPty } from 'node-pty';
import * as pty from 'node-pty';
import { Terminal as XTerminal } from 'xterm';
import ProcessFactory from '@app/factories/ProcessFactory';
import Terminal, { TerminalType } from '@app/Terminal';
import { isWin } from '@common/utils/utils';

export default class PtyProcessFactory extends ProcessFactory<IPty>{

    public factoryObject: UndefinedObject<IPty>;

    /**
     * Build a IPty object with params.
     *
     * @see PtyFactoryParams
     *
     * @param params - PtyFactoryParams
     * @returns The IPty instance
     */
    public build({ shell, terminal, cwd, terminalType }: PtyFactoryParams): IPty {

        const env = Terminal.buildEnv(terminalType);

        // TODO configurable
        this.factoryObject = pty.spawn(shell, [!isWin ? '--login' : ''], {

            name: 'xterm-256color',
            cols: terminal.cols,
            rows: terminal.rows,
            cwd,
            env,
        });

        return this.factoryObject;
    }

    /**
     * Listen for events on the pty instance.
     *
     * @param terminal - The terminal to write on
     * @param terminalType - The type of the terminal
     * @param onClose - Called when the pty process is closed
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public listen(terminal: XTerminal, terminalType: TerminalType, onClose: () => void) {

        this.getFactoryObject().onData((data: string) => {

            terminal.write(data);
        });

        this.getFactoryObject().onExit(onClose);
    }

    /**
     * Write data to the pty instance.
     *
     * @param data - The data to write
     */
    public write(data: string) {

        this.getFactoryObject().write(data);
    }

    /**
     * Resize the pty instance.
     *
     * @param cols - The number of cols
     * @param rows - The number of rows
     */
    public resize(cols: number, rows: number) {

        this.getFactoryObject().resize(cols, rows);
    }

    /**
     * Get the instance of the built object.
     *
     * @returns The IPty instance
     */
    public getFactoryObject(): IPty {

        return this.factoryObject as IPty;
    }
}

/**
 * The parameters to build the pty process.
 */
export type PtyFactoryParams = {

    terminal: XTerminal;
    shell: string;
    cwd: string;
    terminalType: TerminalType;
}
