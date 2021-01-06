import { Resolver } from '@common/resolvers/Resolver';
import { UndefinedObject } from '@common/types/types';

export default abstract class ResolverProvider<T, R> {

	// The list of resolvers to use for this ResolverProvider
	private resolvers: Resolver<T, R>[];

	constructor() {
		
		this.resolvers = this.getResolvers();
	}

	/**
	 * Resolve a R object based on a T object by looping through all the
	 * availables resolvers. Can return undefined if no resolver has been
	 * able to resolve the T object to a R object.
	 */
	public resolve(object: T): UndefinedObject<R> {

		let resolved: UndefinedObject<R>;

		this.resolvers.forEach((current) => {

			if(!resolved)
				resolved = current.resolve(object);	
		});

		return resolved; 
	}

	/**
	 * Get all the resolvers to use in this ResolverProvider.
	 *
	 * @returns An array of the resolvers to use
	 */
	protected abstract getResolvers(): Resolver<T, R>[];
}
