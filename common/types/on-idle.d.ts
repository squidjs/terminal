// Types definitions for 'on-idle' module
declare module 'on-idle';

/**
 * Call the callback passed in parameters when the
 * browser is idle.
 *
 * @param callback - The callback to call
 */
declare function onIdle(callback: () => void): void;

