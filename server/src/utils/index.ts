import BadRequestError from '@src/errors/BadRequestError';

class Utils {
    static handleDuplicatedKeyError(err: any): never {
        const errorData: string[] = Object.entries(err.keyValue).map(([key, value]: [string, unknown]) => `[${key}: ${value}]`);

        throw new BadRequestError(`Entity with a provided data already exists: ${errorData.join(', ')}`);
    }
}

export default Utils
