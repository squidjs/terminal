/**
 * Lazy-load the given module name. This can improve start-up performances
 * a lot, by only requiring the desired module when it is used. The lazy-
 * loaded modules won't be required on the Evaluation script.
 *
 * @param name - The name of the module
 * @returns A callback which returns the module
 */
export const lazyload = <T>(name: string): () => T => {

    let lazyModule: T;

    return () => {

        if(!lazyModule) {

            if(typeof __non_webpack_require__ !== 'undefined')
                lazyModule = __non_webpack_require__(`${name}`);
            else
                lazyModule = require(`${name}`);
        }

        return lazyModule;
    }
}

/**
 * Lazy-load an object. This can improve start-up performances. The lazy-
 * loaded actions won't be executed on the Evaluation script.
 *
 * @param action - The action to lazy-load
 * @returns A callback which returns the object
 */
export const lazyLoadAction = <T>(action: () => T): () => T => {

    let lazyResult: T;

    return () => {

        if(!lazyResult)
            lazyResult = action();

        return lazyResult;
    }
}
