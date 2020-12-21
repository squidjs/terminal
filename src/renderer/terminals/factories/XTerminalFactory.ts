import { Terminal as XTerminal } from 'xterm';
import { Factory } from '../../../common/factories/Factory';
import { UndefinedObject } from '../../../common/types/types';

export default class XTerminalFactory implements Factory<XTerminal> {

	public factoryObject: UndefinedObject<XTerminal>;

	/**
	 * Build a IPty object and return it back.
	 *
	 * @returns The XTerminal instance
	 */
	public build(): XTerminal {

		this.factoryObject = new XTerminal();

		return this.factoryObject;
	}

	/**
	 * Get the instance of the built object.
	 *
	 * @returns The XTerminal instance
	 */
	public getFactoryObject(): XTerminal {

		return this.factoryObject as XTerminal;
	}
}
