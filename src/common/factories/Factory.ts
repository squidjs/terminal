import { UndefinedObject } from '../types/types';

/**
 * Represent a factory of T, to build and get a T object.
 */
export interface Factory<T> {

    // The instance of the T object
    factoryObject: UndefinedObject<T>;

    /**
     * Build a T object with optional parameters.
     *
     * @param params - The params to use, optional
     * @returns The T instance
     */
    build(params?: FactoryBuildParams): T;

    /**
     * Get the instance of the built object.
     *
     * @returns The T instance
     */
    getFactoryObject(): T;
}

export type FactoryBuildParams = any;
