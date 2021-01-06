import { UndefinedObject } from '@common/types/types';

export interface Resolver<T, R> {

	/**
	 * Resolve a R object based on a T object. Can return undefined
	 * if nothing has been found.
	 *
	 * @param object - The object to resolve
	 * @returns The resolved object
	 */
	resolve(object: T): UndefinedObject<R>;

	/**
	 * Check if we can resolve the T object.
	 *
	 * @param object - The object to resolve
	 * @returns True if this resolver can resolve
	 */
	canResolve(object: T): boolean;
}
