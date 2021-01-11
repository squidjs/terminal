import React, { FC, ReactElement } from 'react';
import { SectionType } from '@ui/components/windows/Settings';
import ProfileSection from '@ui/components/settings/sections/ProfileSection';
import AboutSection from '@ui/components/settings/sections/AboutSection';

interface Props {

    section: SectionType;
}

const SECTIONS: { [key: string]: ReactElement } = {

    profile: <ProfileSection />,
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
            { getSection() }    
        </div>
    );
}

export default SectionRenderer;
