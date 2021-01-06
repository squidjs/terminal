import { ITerminal } from '@app/Terminal';
import { Resolver } from '@common/resolvers/Resolver';
import { UndefinedObject } from '@common/types/types';
import { IconResolverType } from '@app/resolvers/IconResolverProvider';

export default class TitleIconResolver implements Resolver<ITerminal, IconResolverType> {

	/**
	 * Resolve the icon based on the name of the ITerminal instance.
	 * This is useful to resolve the icon based on the current terminal
	 * title.
	 *
	 * @param object - The object to resolve
	 * @returns The resolved object
	 */
	public resolve(object: ITerminal): UndefinedObject<IconResolverType> {

		let icon: UndefinedObject<IconResolverType>; 

		// Programs
		if(object.name.includes('vim'))
			icon = ['custom-vim', '#019833'];
		
		// Utilities
		else if(object.name.includes('yarn'))
			icon = ['dev-javascript', '#E8D44D'];
		else if(object.name.includes('npm'))
			icon = ['dev-npm', '#C53635'];
		
		// Languages
		else if(object.name.includes('php'))
			icon = ['dev-php', '#7377AD'];
		else if(object.name.includes('node'))
			icon = ['mdi-nodejs', '#6DA55F'];
		else if(object.name.includes('python'))
			icon = ['dev-python', '#FFD040'];

		return icon;
	}

	/**
	 * Check if we can resolve the ITerminal. We want to use this resolver
	 * in first so it will always return true.
	 *
	 * @param object - The object to resolve
	 * @returns True if this resolver can resolve
	 */
	public canResolve(_: ITerminal): boolean {

		return true;
	}
} 
