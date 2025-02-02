import {setupStore} from "@/app/api/external/backend";
import {handleUIError} from "@/app/hooks/useThrowError";
import {StoreSetup} from "@/app/models/store_setup";

export const useSetupStore = async (formData: StoreSetup) => {
    try {
        return await setupStore(formData);
    } catch (error) {
        handleUIError(error, 'Setup-store');
    }
};


