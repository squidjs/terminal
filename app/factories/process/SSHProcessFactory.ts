import { Client, ClientChannel, ClientErrorExtensions } from 'ssh2';
import { UndefinedObject } from '@common/types/types';
import { Terminal as XTerminal } from 'xterm';
import ProcessFactory from '@app/factories/ProcessFactory';
import Terminal, { TerminalType } from '@app/Terminal';

export default class SSHProcessFactory extends ProcessFactory<Client> {

	public factoryObject: UndefinedObject<Client>;
	private channel: UndefinedObject<ClientChannel>;

	/**
	 * Build a Client object with params.
	 *
	 * @param params - SSHFactoryParams
	 * @returns The Client instance
	 */
	public build(params: SSHFactoryParams): Client {

		this.factoryObject = new Client();
		this.factoryObject.connect({ ...params });

		return this.factoryObject;
	}

	/**
	 * Listen for events on the client instance.
	 *
	 * @param terminal - The terminal to write on
	 * @param terminalType - The type of the terminal
	 * @param onClose - Called when the client process is closed
	 */
	public listen(terminal: XTerminal, terminalType: TerminalType, onClose: () => void) {

		const options = {

			env: Terminal.buildEnv(terminalType),
		};

		terminal.write('Connecting...\n\r');

		this.getFactoryObject().on('error',  (err: Error & ClientErrorExtensions) => {

			terminal.write(`Could not connect to host: ${err.message}`);
		});
		
		this.getFactoryObject().on('connect', () => terminal.write('Successfully connected, authenticating...\n\r')); 

		this.getFactoryObject().on('ready', () => {

			terminal.write('Successfully authenticated!\n\r');

			this.getFactoryObject().shell({

				term: 'xterm-256color',
				rows: terminal.rows,
				cols: terminal.cols,

			}, options, (err: Error | undefined, channel: ClientChannel) => {

				if(err)
					onClose();

				this.channel = channel;

				channel.on('close', () => {

					onClose();
					this.getFactoryObject().end();
				});

				channel.on('data', (data: string) => {

					terminal.write(data);
				});
			});
		});
	}

	/**
	 * Write data to the client instance.
	 *
	 * @param data - The data to write
	 */
	public write(data: string) {

		this.channel?.write(data);
	}

	/**
	 * Resize the client instance.
	 *
	 * @param cols - The number of cols
	 * @param rows - The number of rows
	 */
	public resize(cols: number, rows: number) {

		this.channel?.setWindow(rows, cols, rows, cols);
	}

	/**
	 * Get the instance of the built object.
	 *
	 * @returns The Client instance
	 */
	public getFactoryObject(): Client {

		return this.factoryObject as Client;
	}
}

/**
 * The parameters to build the ssh client.
 */
export type SSHFactoryParams = {

	host: string;
	port: number;
	username: string;
	password?: string;
	privateKey?: Buffer | string;
}
