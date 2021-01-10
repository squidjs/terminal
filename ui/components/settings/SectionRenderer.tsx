import React, { FC, ReactElement } from 'react';
import { SectionType } from '@ui/components/windows/Settings';
import ProfileSection from '@ui/components/settings/sections/ProfileSection';
import AboutSection from '@ui/components/settings/sections/AboutSection';

interface Props {

    section: SectionType;
}

const SectionRenderer: FC<Props> = ({ section }: Props): ReactElement => {

    return (
        <div className="section">
            {
                section === 'profile' &&
                    <ProfileSection />
            }
            {
                section === 'about' &&
                    <AboutSection />
            }
        </div>
    );
}

export default SectionRenderer;
