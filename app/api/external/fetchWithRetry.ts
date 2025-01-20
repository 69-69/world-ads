// Fetch data from the API with retries: Retry 3 times with a 2-second delay between each attempt
type reqOptionsInterface = {
    method: string,
    endpoint?: string,
    headers?: Record<string, string>,
    body?: string,
    retries?: number,
    delay?: number
};

// NOTE: This function is not tied to the Axios instance and can be used with any fetch API
const fetchWithRetry = async (
    baseUrl: string,
    {method, endpoint, headers, body, retries = 3, delay = 2000}: reqOptionsInterface,
) => {
    let attempts = 0;
    let lastError: Error | null = null;

    const fullUrl = endpoint ? `${baseUrl}?endpoint=${endpoint}` : baseUrl;

    while (attempts < retries) {
        try {
            const response = await fetch(fullUrl, {
                method, headers, body,
            });

            if (!response.ok) {
                console.log(`Fetch error: ${response}`);
            }

            const data = await response.json();

            return {response, data};
        } catch (error) {
            lastError = error instanceof Error ? error : new Error('Unknown error');
            if (attempts < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            attempts++;
        }
    }

    throw lastError || new Error('Unknown error');
};

export default fetchWithRetry;


/*
const fetchWithRetry = async (
    baseUrl: string, {method, endpoint, headers, body, retries = 3, delay = 2000}: {
        method: string,
        endpoint: string,
        headers?: Record<string, string>,
        body?: string,
        retries?: number,
        delay?: number
    },
) => {

    let attempts = 0;
    let lastError: Error | null = null;

    while (attempts < retries) {
        try {
            const response = await fetch(`${baseUrl}?endpoint=${endpoint}`, {
                method,
                headers,
                body,
            });

            if (!response.ok) {
                console.log(`Steve to fetch: ${response.statusText}`);
            }

            return await response.json(); // Successful response, return data
        } catch (error: unknown) {
            lastError = error instanceof Error ? error : new Error('Unknown error');
            attempts++;
            // console.error(`Attempt ${attempts} failed: ${lastError.message}`);

            if (attempts < retries) {
                // console.log(`Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay)); // Delay before retry
            }
        }
    }

    // If all attempts fail, throw the last error encountered
    throw lastError || new Error('Unknown error');
};

export default fetchWithRetry;*/
