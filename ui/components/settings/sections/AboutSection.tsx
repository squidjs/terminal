import React, { FC, ReactElement } from 'react';
import { remote } from 'electron';

const AboutSection: FC = (): ReactElement => {

    return (
        <>
            <h2>Open source</h2>
            <p>Squid is a free and open source software licensed under the MIT license.</p>
            <p>You can check and contribute to the source code at https://github.com/QuiiBz/squid</p>
            <h2>Application version</h2>
            <p>You are using Squid version { remote.app.getVersion() }.</p>
        </>
    );
}

export default AboutSection;
