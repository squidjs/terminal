import * as fs from 'fs';
import { IOptions } from '@/options/options';
import md5 from 'md5';

/**
 * Watch for changes on a file
 *
 * @param path - The path of the file to watch
 * @param onChange - A callback called when the file changed
 * @returns void
 */
export function watchForChanges(path: string, onChange: (options: IOptions) => any): void {

    let previousMD5: string;
    let fsWait: boolean = false;

    // Watch the file
    fs.watch(path, (event: string, file: string) => {

        if(file) {

            if(fsWait)
                return;

            setTimeout(() => fsWait = false, 100);

            const buffer: Buffer = fs.readFileSync(path);
            const currentMD5 = md5(buffer);

            // If the md5 if the same, return
            if(currentMD5 === previousMD5)
                return;

            previousMD5 = currentMD5;

            try {

                onChange(JSON.parse(buffer.toString()));

            } catch (error) {

                console.log(error);
            }
        }
    });
}
