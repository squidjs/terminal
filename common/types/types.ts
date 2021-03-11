/**
 * A type for a object which can be undefined, or set to the instance of it.
 */
export type UndefinedObject<T> = T  | undefined;

/**
 * Represent a update status that is sent from main to renderer process.
 */
export interface IUpdateStatus {

    /**
     * If a update is available.
     */
    updateAvailable?: boolean;
    /**
     * If the update is ready to be installed.
     */
    readyToInstall?: boolean;
}
