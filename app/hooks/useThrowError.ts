import {AxiosError} from "axios";

function handleApiError(error: unknown): void {
    const msg = 'Something went wrong, please try again';

    if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || msg);
    } else if (error instanceof Error) {
        throw new Error(error.message || msg);
    } else {
        throw new Error('An unexpected error occurred');
    }
}

function handleUIError(error: unknown, tag: string): never {
    const pleaseTryAgain = 'Something went wrong, please try again';
    const msg = error instanceof Error ? error.message : pleaseTryAgain;

    console.error(`${tag} with error: `, msg);

    // Throw the general error message
    throw new Error(pleaseTryAgain);
}


export {handleApiError, handleUIError};