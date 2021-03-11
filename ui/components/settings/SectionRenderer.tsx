import React, { FC, ReactElement } from 'react';
import { SectionType } from '@ui/windows/Settings';
import ProfileSection from '@ui/components/settings/sections/ProfileSection';
import AboutSection from '@ui/components/settings/sections/AboutSection';
import HostsSection from '@ui/components/settings/sections/HostsSection';

interface Props {

    section: SectionType;
}

const SECTIONS: { [key: string]: ReactElement } = {

    profile: <ProfileSection />,
    hosts: <HostsSection />,
    about: <AboutSection />,
};

const SectionRenderer: FC<Props> = ({ section }: Props): ReactElement => {

    const getSection = (): ReactElement | null => {

        for(const [key, element] of Object.entries(SECTIONS)) {

            if(key == section)
                return element;
        }

        return null;
    }

    return (
        <div className="section">
            <section className="content">
                <h1 className="title">{ section }</h1>
                { getSection() }
            </section>
        </div>
    );
}

export default SectionRenderer;
