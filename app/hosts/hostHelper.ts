import { IHost } from './HostHandler';

type side = 'create' | 'edit';

/**
 * Add listeners
 */
export function addListeners() {

    document.getElementById('create-host').addEventListener('click', (event) => {

        event.preventDefault();
        openSide('create', {
            name: '',
            ip: '',
            port: 22,
            username: 'root',
            password: '',
            privateKey: ''
        });
    });

    document.getElementById('close-create-host').addEventListener('click', (event) => {

        event.preventDefault();
        closeSide('create');
    });

    document.getElementById('close-edit-host').addEventListener('click', (event) => {

        event.preventDefault();
        closeSide('edit');
    });

    document.getElementById('search-host').addEventListener('keyup', () => {

        const hosts: HTMLCollection = document.getElementById('hosts-container').children;
        const searching = (document.getElementById('search-host') as HTMLInputElement).value;

        Array.from(hosts).forEach((current: HTMLElement) => {

            if(current.id.replace('host-', '').toLowerCase().includes(searching))
               current.style.display = 'flex';
            else
                current.style.display = 'none';
        })
    });
}

export function openSide(type: side, host: IHost) {

    fillInputs(type, host);
    document.getElementById(type + '-host-container').classList.add('visible');
}

export function closeSide(type: side) {

    document.getElementById(type + '-host-container').classList.remove('visible');
}

/**
 * Get a host with filled inputs
 * @return The IHost
 */
export function provideHost(type: side): IHost {

    return {
        name: (document.getElementById(type + '-host-name') as HTMLInputElement).value,
        ip: (document.getElementById(type + '-host-ip') as HTMLInputElement).value,
        port: Number((document.getElementById(type + '-host-port') as HTMLInputElement).value),
        username: (document.getElementById(type + '-host-username') as HTMLInputElement).value,
        password: (document.getElementById(type + '-host-password') as HTMLInputElement).value,
        privateKey: (document.getElementById(type + '-host-privateKey') as HTMLInputElement).value,
    };
}

/**
 * Fill the inputs with the host credentials
 * @param type
 * @param host
 */
export function fillInputs(type: side, host: IHost) {

    (document.getElementById(type + '-host-name') as HTMLInputElement).value = host.name;
    (document.getElementById(type + '-host-ip') as HTMLInputElement).value = host.ip;
    (document.getElementById(type + '-host-port') as HTMLInputElement).value = String(host.port);
    (document.getElementById(type + '-host-username') as HTMLInputElement).value = host.username;
    (document.getElementById(type + '-host-password') as HTMLInputElement).value = host.password;
    (document.getElementById(type + '-host-privateKey') as HTMLInputElement).value = host.privateKey;
}

/**
 * Create a host element or replace the old one
 * @param current
 * @param infoClick
 * @param sshClick
 * @return The created DOM element
 */
export function createHostElement(current: IHost, infoClick: (event: MouseEvent) => void, sshClick: (event: MouseEvent) => void): HTMLElement {

    const old = document.getElementById('host-' + current.name);

    if(old)
        old.remove();

    const host = document.createElement('div');
    host.className = 'host';
    host.id = 'host-' + current.name;
    const infoContainer = document.createElement('div');
    infoContainer.className = 'info';
    const hostName = document.createElement('p');
    hostName.className = 'name';
    hostName.innerText = current.name;
    const hostInfo = document.createElement('p');
    hostInfo.className = 'description';
    hostInfo.innerText = current.username + '@' + current.ip + ':' + current.port;
    const buttons = document.createElement('div');
    buttons.className = 'buttons';
    const ssh = document.createElement('button');
    ssh.className = 'btn';
    ssh.innerText = 'SSH';
    const sftp = document.createElement('button');
    sftp.className = 'btn blue';
    sftp.innerText = 'SFTP';

    infoContainer.appendChild(hostName);
    infoContainer.appendChild(hostInfo);
    host.appendChild(infoContainer);
    host.appendChild(buttons);
    buttons.appendChild(ssh);
    buttons.appendChild(sftp);

    infoContainer.addEventListener('click', (event: MouseEvent) => infoClick(event));
    ssh.addEventListener('click', (event: MouseEvent) => sshClick(event));

    return host;
}
