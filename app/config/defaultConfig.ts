import { IConfig } from './Config';

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
		brightWhite: '#ffffff'
	},
	bell: {
		style: 'none',
	},
	cursor: {
		style: 'block',
		blink: true
	},
	font: {
		size: 14,
		family:  'monospace'
	},
	shell: process.platform === 'win32' ? 'cmd.exe' : 'bash',
	currentTheme: 'default',
	scrollSensitivity: 1,
	fastScrollSensitivity: 5,
	fastScrollModifier: 'shift',
	webGlRendering: true,
	useBackgroundImage: false,
	backgroundImageOpacity: 0.5,
	backgroundImage: '',
}
