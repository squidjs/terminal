import { ITerminal } from '@app/Terminal';
import { Resolver } from '@common/resolvers/Resolver';
import ResolverProvider from '@common/resolvers/ResolverProvider';
import { Tuple } from '@common/types/types';
import ShellIconResolver from '@app/resolvers/ShellIconResolver';
import TitleIconResolver from '@app/resolvers/TitleIconResolver';
import SSHIconResolver from '@app/resolvers/SSHIconResolver';

// The type of what to resolve in this resolver
export type IconResolverType = Tuple<string, string>;  

// Default ssh icon
export const SSH_ICON: IconResolverType = ['fa-server', '#0465B6'];

export default class IconResolverProvider extends ResolverProvider<ITerminal, IconResolverType> {

	/**
	 * Get all the resolvers to use in this IconResolverProvider.
	 *
	 * @returns An array of the resolvers to use
	 */
	public getResolvers(): Resolver<ITerminal, IconResolverType>[] {

		return [

			new TitleIconResolver(),
			new ShellIconResolver(),
			new SSHIconResolver(),
		];
	}		
}
