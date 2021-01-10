import React, { FC, ReactElement } from 'react';
import { SectionType } from '@ui/components/windows/Settings';

interface Props {

    setSection: (section: SectionType) => void;
}

const Sidebar: FC<Props> = ({ setSection }: Props): ReactElement => {

    return (
        <div className="sidebar">
            <button onClick={() => setSection('profile')} type="button">Profile</button>
            <button onClick={() => setSection('about')} type="button">About</button>
        </div>
    );
}

export default Sidebar;
