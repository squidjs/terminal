import { IHost } from './HostHandler';

export function createHostElement(current: IHost, onClick: (event: MouseEvent) => void): HTMLElement {

    const host = document.createElement('div');
    host.className = 'host';
    const infoContainer = document.createElement('div');
    infoContainer.className = 'host-info-container';
    const hostName = document.createElement('p');
    hostName.className = 'host-name';
    hostName.innerText = current.name;
    const hostInfo = document.createElement('p');
    hostInfo.className = 'host-info';
    hostInfo.innerText = current.username + '@' + current.ip + ':' + current.port;
    const ssh = document.createElement('div');
    ssh.className = 'host-btn ssh';
    ssh.innerText = 'SSH';
    const sftp = document.createElement('div');
    sftp.className = 'host-btn sftp';
    sftp.innerText = 'SFTP';

    infoContainer.appendChild(hostName);
    infoContainer.appendChild(hostInfo);
    host.appendChild(infoContainer);
    host.appendChild(ssh);
    host.appendChild(sftp);

    ssh.addEventListener('click', (event: MouseEvent) => onClick(event));

    return host;
}
