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

const errorUtils = {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    getError: (error: any) => {
        let e = error;
        if (error.response) {
            e = error.response.data;                   // data, status, headers
            if (error.response.data && error.response.data.error) {
                e = error.response.data.error;           // my app specific keys override
            }
        } else if (error.message) {
            e = error.message;
        } else {
            e = "Steve-Unknown error occurred";
        }
        return e;
    },
};


export {handleApiError, handleUIError, errorUtils};