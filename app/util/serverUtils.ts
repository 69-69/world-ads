'use server';
import {AxiosResponse} from "axios";
import {NextResponse} from "next/server";
import {cookies} from "next/headers";

// NEXT-JS Cookies
// Next-JS Ref Cookies: https://nextjs.org/docs/app/api-reference/functions/cookies#getting-all-cookies
type _SetCookieOptions = {
    name: string;
    value: string;
    maxAge?: number;
    path?: string;
    httpOnly?: boolean; // Cookie is only accessible in the server not client
    response?: NextResponse;
    sameSite?: 'lax' | 'strict' | 'none';
};

type VerifyType = { contact: 'email' | 'phone' };

type CookieControlOptions = { response?: NextResponse, name?: string };


// Set Cookies utility function
const setCookie = async ({
                             name,
                             value,
                             response,
                             sameSite = 'none',
                             path = '/',
                             httpOnly = true,
                             maxAge = 7 * 24 * 60 * 60, // convert 7 days to seconds
                         }: _SetCookieOptions
) => {
    if (!name || !value) {
        throw new Error('Cookie name and value are required.');
    }

    const isProduction = process.env.COOKIE_SECURE === 'production';
    // console.log('Setting cookie-httpOnly:', httpOnly, 'sameSite:', sameSite, 'Secure:', isProduction);

    const cookieOptions = {
        httpOnly,
        secure: isProduction, // Secure: True: Ensures cookie is sent via HTTPS
        sameSite: sameSite /*?? (isProduction ? 'none' : 'lax')*/,
        path,
        maxAge,
    };

    if (response) {
        // If response is provided, use NextResponse cookies
        response.cookies.set(name, value, cookieOptions);
    } else {
        // If no response is provided, use Next.js cookies API
        const cookieStore = await cookies();
        cookieStore.set(name, value, cookieOptions);
    }
};

// Function to extract the refresh_token value from the set-cookie header
const extractRefreshToken = async (setCookieHeader: string[] | undefined): Promise<string | null> => {
    // Find the refresh_token cookie in the set-cookie header
    const refreshTokenCookie = await setCookieHeader?.find(cookie => cookie.includes('refresh_token'));

    if (refreshTokenCookie) {
        // Use a regex to extract the refresh_token value (handles potential extra spaces or attributes)
        const match = refreshTokenCookie.match(/refresh_token=([^;]+)/);
        return match ? match[1] : null; // The value of the refresh_token or null if not found
    }
    return null; // Return null if no refresh_token cookie is found
}

const getCookie = async ({response, name}: CookieControlOptions) => {

    if (!name) {
        throw new Error('Cookie name is required.');
    }

    if (response) {
        // If response is provided, use NextResponse cookies
        return response.cookies.get(name)?.value ?? null;
    }
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value ?? null;

    /*const cookie = headers?.cookie ?? '';
    return cookie.split(';').reduce((cookies: any, current: any) => {
        const [name, value] = current.trim().split('=');
        cookies[name] = value;
        return cookies;
    }, {});*/
}

const deleteCookie = async ({response, name}: CookieControlOptions) => {
    const cookieStore = response ? response.cookies : await cookies();

    if (!name) {
        // Delete all cookies
        cookieStore.getAll().forEach(cookie => cookieStore.delete(cookie.name));
        return;
    }

    // Delete a specific cookie
    cookieStore.delete(name);
}

// Get the signup token
const getSignupToken = async () => await getCookie({name: 'signup_token'}) ?? null;

// Get which contact is being verified
const getIsVerified = async ({contact}: VerifyType) => await getCookie({name: `verified_${contact}`}) ?? null;

// Utility function to select data based on a comma-separated key string
const _selectDataFromResponse = (data: Record<string, unknown>, dataKey: string | null): Record<string, unknown> => {
    if (!dataKey) return {};

    return dataKey.split(',').reduce((acc, key) => {
        key = key.trim();
        if (data[key] !== undefined) {
            acc[key] = data[key];
        }
        return acc;
    }, {} as Record<string, unknown>);
};

// Set Cookies from Response Data
const setCookiesFromResponse = async (nextResponse: NextResponse, axiosResponse: AxiosResponse, name: string | null, dataKey: string | null, days: number = 7) => {
    if (!name || !dataKey) return;

    const {data} = axiosResponse;
    const selectedData = _selectDataFromResponse(data, JSON.parse(dataKey));

    await setCookie({
        name,
        maxAge: days,
        response: nextResponse,
        value: JSON.stringify(selectedData || data),
    });
};

export {
    setCookie,
    getCookie,
    deleteCookie,
    getSignupToken,
    getIsVerified,
    setCookiesFromResponse,
    extractRefreshToken,
};


/*// ERROR HANDLERS

const errorUtils = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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


/*// Function to get the value of a specific cookie by name
function getCookie(name) {
    // Decode the cookie string to handle any URL-encoded characters
    const cookieString = decodeURIComponent(document.cookie);

    // Split the cookie string into individual cookies
    const cookies = cookieString.split(';');

    // Loop through the cookies to find the one with the specified name
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim(); // Remove any leading/trailing spaces
        if (cookie.startsWith(name + '=')) {
            // Return the value of the cookie
            return cookie.substring(name.length + 1); // Skip the cookie name and '='
        }
    }
    return null; // Return null if the cookie is not found
}

// Usage
const signupToken = getCookie('signup_token');
console.log(signupToken);
*/
