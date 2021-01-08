import React, { Component, CSSProperties, FC, ReactElement, useState } from 'react';
import NavbarButton from '@ui/components/navbar/NavbarButton';
import { remote } from 'electron';
import Tabs from '@ui/components/tabs/Tabs';
import { IConfig } from '@common/config/Config';
import '@ui/styles/navbar.scss';

interface Props {

	config: IConfig;
}

/**
 * Minimize the current window.
 */
const minimize = () => {

	remote.getCurrentWindow().minimize();
}

/**
 * Close the current window.
 */
const close = () => {

	remote.getCurrentWindow().close();
}

const Navbar: FC<Props> = ({ config }: Props): ReactElement => {

	const [maximized, setMaximized] = useState<boolean>(false);
	
	/**
	 * Maximize or restore the current window.
	 */
	const maximize = () => {

		setMaximized(!maximized);

		if(maximized)
			remote.getCurrentWindow().unmaximize();
		else
			remote.getCurrentWindow().maximize();
	}
	
	return (
		<div className="navbar" style={{ '--border': config.theme.border } as CSSProperties }>
			<Tabs config={config} />
			<div className="buttons">
				<NavbarButton
					config={config}
					onClick={minimize}
					path="M 0,5 10,5 10,6 0,6 Z" />
				<NavbarButton
					config={config}
					onClick={maximize}
					path="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z" />
				<NavbarButton
					config={config}
					onClick={close}
					path="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z" />
			</div>
		</div>
	);
}

export default Navbar;

