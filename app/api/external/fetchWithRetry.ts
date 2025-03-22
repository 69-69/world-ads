// Fetch data from the API with retries: Retry 3 times with a 2-second delay between each attempt
type reqOptionsInterface = {
    method: string,
    endpoint?: string,
    headers?: Record<string, string>,
    body?: FormData | string,
    retries?: number,
    delay?: number
};

// NOTE: This function is not tied to the Axios instance and can be used with any fetch API
const fetchWithRetry = async (
    baseUrl: string,
    {
        method,
        endpoint,
        body,
        retries = 3,
        delay = 2000,
        headers,
    }: reqOptionsInterface,
) => {
    let attempts = 0;
    let lastError: Error | null = null;

    const fullUrl = endpoint ? `${baseUrl}?endpoint=${endpoint}` : baseUrl;

    while (attempts < retries) {
        try {
            // console.log('Steve-fetchWithRetry-URL:', fullUrl);
            // console.log('Steve-fetchWithRetry-Data:', body);
            const response = await fetch(fullUrl, {method, headers, body});

            if (!response.ok) {
                console.log(`Fetching-error: ${response.status}`);
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

    throw lastError || new Error('Unknown-error');
};

export default fetchWithRetry;

