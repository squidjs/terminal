import { ITerminal } from '@app/Terminal';
import { Resolver } from '@common/resolvers/Resolver';
import { UndefinedObject } from '@common/types/types';
import { IconResolverType, SSH_ICON } from '@app/resolvers/icon/IconResolverProvider';

export default class TitleIconResolver implements Resolver<ITerminal, IconResolverType> {

	private readonly SSH_REGEX = /^[a-z]+@([a-z]|[A-Z]|[0-9])+:/;

	/**
	 * Resolve the icon based on the name of the ITerminal instance.
	 * This is useful to resolve the icon based on the current terminal
	 * title.
	 *
	 * @param object - The object to resolve
	 * @returns The resolved object
	 */
	public resolve({ name }: ITerminal): UndefinedObject<IconResolverType> {

		let icon: UndefinedObject<IconResolverType>;

		// Programs
		if(name.includes('vim'))
			icon = ['custom-vim', '#019833'];

		// Utilities
		else if(name.includes('yarn'))
			icon = ['dev-javascript', '#E8D44D'];
		else if(name.includes('npm'))
			icon = ['dev-npm', '#C53635'];
		else if(this.SSH_REGEX.test(name))
			icon = SSH_ICON;

		// Languages
		else if(name.includes('php'))
			icon = ['dev-php', '#7377AD'];
		else if(name.includes('node'))
			icon = ['mdi-nodejs', '#6DA55F'];
		else if(name.includes('python'))
			icon = ['dev-python', '#FFD040'];

		return icon;
	}

	/**
	 * Check if we can resolve the ITerminal. We want to use this resolver
	 * in first so it will always return true.
	 *
	 * @param _ - The object to resolve
	 * @returns True if this resolver can resolve
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public canResolve(_: ITerminal): boolean {

		return true;
	}
}
