import React, { FC, ReactElement } from 'react';
import { SectionType } from '@ui/windows/Settings';

interface Props {

    section: SectionType;
    setSection: (section: SectionType) => void;
}

const Sidebar: FC<Props> = ({ section, setSection }: Props): ReactElement => {

    return (
        <div className="sidebar">
            <button className={section === 'profile' ? 'selected' : ''} onClick={() => setSection('profile')} type="button">Profile</button>
            <button className={section === 'hosts' ? 'selected' : ''} onClick={() => setSection('hosts')} type="button">Hosts</button>
            <button className={section === 'about' ? 'selected' : ''} onClick={() => setSection('about')} type="button">About</button>
        </div>
    );
}

export default Sidebar;
