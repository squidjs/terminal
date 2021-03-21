import path from 'path';
import fs from 'fs';

const CONFIG_PATH = path.join(process.env.HOME, '.squidrc.json');
export const PACKAGES_PATH = path.join(process.env.HOME, '.squid');

export const getConfig = (): IConfig => {

    const data = fs.readFileSync(CONFIG_PATH);
    return JSON.parse(data.toString());
}

export const saveConfig = (config: IConfig) => {

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

export interface IConfig {

    packages: string[];
}
