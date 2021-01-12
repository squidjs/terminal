import React, { FC, ReactElement } from 'react';
import { remote } from 'electron';
import Subtitle from '@ui/components/settings/elements/Subtitle';
import Text from '@ui/components/settings/elements/Text';

const AboutSection: FC = (): ReactElement => {

    return (
        <>
            <Subtitle title="Open source" />
            <Text text="Squid is a free and open source software licensed under the MIT license." />
            <Text text="You can check and contribute to the source code at https://github.com/QuiiBz/squid" />
            <Subtitle title="Application version" />
            <Text text={`You are using Squid version ${remote.app.getVersion()}.`} />
        </>
    );
}

export default AboutSection;
