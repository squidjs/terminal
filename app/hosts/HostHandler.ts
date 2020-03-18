import * as fs from 'fs';
import * as path from 'path';
import { userDataPath } from '../settings/Utils';
import * as keytar from 'keytar';
import * as events from 'events';

export default class HostHandler extends events.EventEmitter {

    private readonly path: string;
    private hostNames: string[];
    private hosts: IHost[];

    constructor() {

        super();

        this.path = path.join(userDataPath, 'hosts.squid.json');
        this.hostNames = this.load();

        this.loadKeytar((hosts: IHost[]) => {

            this.hosts = hosts;

            this.emit('keytarLoaded');
        });
    }

    /**
     * Load the host names
     * @return The hosts names
     */
    load(): string[] {

        try {

            return JSON.parse(fs.readFileSync(this.path).toString());

        } catch (error) {

            return [];
        }
    }

    /**
     * Load the host credentials from keytar
     * @param done
     */
    loadKeytar(done: (hosts: IHost[]) => void) {

        const hosts = [];
        let count = 0;

        this.hostNames.forEach(current => {

            keytar.getPassword('squid', current).then((value) => {

                count++;

                if(value)
                    hosts.push(JSON.parse(value));

                if(this.hostNames.length == count)
                    done(hosts);
            });
        });
    }

    /**
     * Add a host to keytar
     * @param host
     * @param done
     */
    addHost(host: IHost, done: () => void) {

        const name = host.name;

        if(!this.hostNames.includes(host.name))
            this.hostNames.push(name);

        keytar.setPassword('squid', name, JSON.stringify(host)).then(() => {

            this.save();
            done();
        });
    }

    /**
     * Remove a host from keytar
     * @param host
     * @param done
     */
    removeHost(host: IHost, done: () => void) {

        this.hostNames.slice(this.hostNames.indexOf(host.name), 1);

        keytar.deletePassword('squid', host.name).then(() => {

            this.save();
            done();
        });
    }

    /**
     * Edit a host credentials
     * @param oldHost
     * @param newHost
     * @param done
     */
    editHost(oldHost: IHost, newHost: IHost, done: () => void) {

        this.removeHost(oldHost, () => this.addHost(newHost, () => done()));
    }

    /**
     * Get a IHost thanks to this name
     * @param name
     * @return IHost
     */
    getHost(name: string): IHost {

        let host = null;

        this.hosts.forEach(current => {

            if(current.name == name)
                host = current;
        });

        return host;
    }

    /**
     * Return the hosts  array
     * @return IHost[]
     */
    getHosts(): IHost[] {

        return this.hosts;
    }

    /**
     * Return the hosts names array
     * @return string[]
     */
    getHostNames(): string[] {

        return this.hostNames;
    }

    /**
     * Save the host names
     */
    save() {

        fs.writeFileSync(this.path, JSON.stringify(this.hostNames, null, 2));
    }
}

export interface IHost {

    name: string;
    ip: string;
    port: number;
    username: string;
    password: string;
    privateKey: string;
}
