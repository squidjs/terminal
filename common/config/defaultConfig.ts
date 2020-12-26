import { IConfig, IShell } from './Config';
import { isWin } from '../utils/utils';

const bashShell: IShell = {

	name: 'Bash',
	path: 'bash',
}

const cmdShell: IShell = {

	name: 'CMD',
	path: 'cmd.exe',
}

const powerShell: IShell = {

	name: 'PowerShell',
	path: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
}

const gitBashShell: IShell = {

	name: 'Git Bash',
	path: 'C:\\Program Files\\Git\\bin\\bash.exe',
}

const wslShell: IShell = {

	name: 'WSL',
	path: 'C:\\Windows\\System32\\wsl.exe',
}

const defaultShell: IShell = {

	name: 'Default',
	path: isWin ? cmdShell.path : bashShell.path,
}

const shells: IShell[] = [];

if(isWin) {

	shells.push(cmdShell);
	shells.push(powerShell);
	shells.push(gitBashShell);
	shells.push(wslShell);

} else
	shells.push(bashShell);

export const defaultConfig: IConfig = {
	theme: {
		background: '#0F0F0F',
		border: '#575656',
		text: '#575656',
		textHover: '#ffffff',
		foreground: '#22da6e',
		cursor: '#22da6e',
		cursorAccent: '#22da6e',
		selection: '#22da6e',
		black: '#011627',
		red: '#EF5350',
		green: '#22da6e',
		yellow: '#addb67',
		blue: '#82aaff',
		magenta: '#c792ea',
		cyan: '#21c7a8',
		white: '#ffffff',
		brightBlack: '#575656',
		brightRed: '#ef5350',
		brightGreen: '#22da6e',
		brightYellow: '#ffeb95',
		brightBlue: '#82aaff',
		brightMagenta: '#c792ea',
		brightCyan: '#7fdbca',
		brightWhite: '#ffffff',
	},
	defaultShell,
	shells,
	webGlRendering: true,
	bell: {
		enabled: false,
		sound: '',
	},
	cursor: {
		style: 'block',
		blink: true,
		width: 1,
	},
	font: {
		size: 14,
		family:  'monospace',
		weight: 'normal',
		weightBold: 'bold',
		letterSpacing: 0,
		lineHeight: 1.0,
	},
	scroll: {
		sensitivity: 1,
		fastScrollSensitivity: 5,
		fastScrollModifier: 'shift',
	},
	backgroundImage: {
		enabled: false,
		opacity: 0.5,
		image: '',
	},
	vibrancy: {
		enabled: true,
		theme: 'appearance-based',
		effect: 'acrylic',
		useCustomWindowRefreshMethod: false,
		maximumRefreshRate: 60,
		disableOnBlur: false,
	},
}
