import { UndefinedObject } from '@common/types/types';
import { isWin } from '@common/utils/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Registry: UndefinedObject<any>;

if(isWin) {

    try {

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        Registry = require('native-reg');

    } catch(err) {

        console.warn(err);
    }
}

export default class NativeContextMenu {

    private appPath: string;
    private regKeys: string[];
    private regParts: { [key: string]: string }[];

    constructor() {

        // eslint-disable-next-line quotes
        this.appPath = `"${process.execPath}"`;
        this.regKeys = [
            'Software\\Classes\\Directory\\Background\\shell\\Squid',
            'Software\\Classes\\Directory\\shell\\Squid',
            'Software\\Classes\\Drive\\shell\\Squid',
        ];
        this.regParts = [
            // eslint-disable-next-line quotes
            { key: 'command', name: '', value: `${this.appPath} "%V"` },
            { name: '', value: 'Open Squid here' },
            { name: 'Icon', value: `${this.appPath}` }
        ];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public check(args: string[]) {

        if(!isWin)
            return;

        // TODO find alternative
        this.install();
        /*switch(args[1]) {

            case '--squirrel-install':
            case '--squirrel-updated':
                this.install();
                break;

            case '--squirrel-uninstall':
                this.uninstall();
                break;

            default:
                break;
        }*/
    }

    private install() {

        this.regKeys.forEach((regKey: string) => {

            try {

                const squidKey = Registry.openKey(Registry.HKCU, regKey, Registry.Access.ALL_ACCESS) ||
                    Registry.createKey(Registry.HKCU, regKey, Registry.Access.ALL_ACCESS);
                const commandKey = Registry.openKey(Registry.HKCU, `${regKey}\\${this.regParts[0].key}`, Registry.Access.ALL_ACCESS) ||
                    Registry.createKey(Registry.HKCU, `${regKey}\\${this.regParts[0].key}`, Registry.Access.ALL_ACCESS);

                this.addValues(squidKey, commandKey);

                Registry.closeKey(squidKey);
                Registry.closeKey(commandKey);

            } catch (error) {

                console.error(error);
            }
        });
    }

    /*private uninstall()  {

        this.regKeys.forEach((regKey: string) => {

            try {

                Registry.deleteTree(Registry.HKCU, regKey);

            } catch (err) {

                console.error(err);
            }
        });
    }*/

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private addValues(squidKey: any, commandKey: any) {

        try {

            Registry.setValueSZ(squidKey, this.regParts[1].name, this.regParts[1].value);
            Registry.setValueSZ(squidKey, this.regParts[2].name, this.regParts[2].value);
            Registry.setValueSZ(commandKey, this.regParts[0].name, this.regParts[0].value);

        } catch (error) {

            console.error(error);
        }
    }
}
