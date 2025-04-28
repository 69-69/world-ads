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

/*// ERROR HANDLERS
export async function handleServerError(error: any) {
  try {
    if (error && error.message === "Unauthorized") await logout();
    if (axios.isAxiosError(error)) {
      const response = error.response;
      if (response?.statusText === "Unauthorized" || response?.data.message === "Unauthorized") await logout();
      if (response && response.data) {
        const { message, statusCode } = response.data;
        // Handle specific status code 409
        if (statusCode !== 200) {
          console.log("Conflict error: ", message);
          return { message, statusCode };
        }
        return { message, statusCode };
      }
      if (error.code === "ECONNREFUSED") {
        return { message: "Connection refused. Please try again later or contact support.", statusCode: 500 };
      }
    } else {
      return { message: "Unknown server error, Please try again later or contact support.", statusCode: 500 };
    }
  } catch (catchError: any) {
    return { message: catchError.message, statusCode: 500 };
  }
}*/


export {handleApiError, handleUIError, errorUtils};