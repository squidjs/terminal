import React, { FC, ReactElement, useState } from 'react';
import Sidebar from '@ui/components/settings/Sidebar';
import SectionRenderer from '@ui/components/settings/SectionRenderer';
import '@ui/styles/settings.scss';

interface Props {

    className: string;
}

export type SectionType = 'profile' | 'about';

const Settings: FC<Props> = ({ className }: Props): ReactElement => {

    const [section, setSection] = useState<SectionType>('profile');

    return (
        <div className={`settings ${className}`}>
            <Sidebar section={section} setSection={setSection} />
            <SectionRenderer section={section} />
        </div>
    );
}

export default Settings;
