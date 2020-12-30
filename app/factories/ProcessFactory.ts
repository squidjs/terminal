import { Factory, FactoryBuildParams } from '../../common/factories/Factory';
import { UndefinedObject } from '../../common/types/types';
import { Terminal as XTerminal } from 'xterm';

export default abstract class ProcessFactory<T> implements Factory<T> {

	public abstract factoryObject: UndefinedObject<T>;

	public abstract build(params: FactoryBuildParams): T;

	/**
	 * Listen for events on the process instance.
	 *
	 * @param terminal - The terminal to write on
	 * @param onClose - Called when the process is closed
	 */
	public abstract listen(terminal: XTerminal, onClose: () => void): void;

	/**
	 * Write data to the process instance.
	 *
	 * @param data - The data to write
	 */
	public abstract write(data: string): void;

	/**
	 * Resize the process instance.
	 *
	 * @param cols - The number of cols
	 * @param rows - The number of rows
	 */
	public abstract resize(cols: number, rows: number): void;

	public abstract getFactoryObject(): T;
}
