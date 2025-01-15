'use server';
// app/hooks/usePostAd.ts
//
import {postAd} from "@/app/api/external/backend";

const usePostAd = async (formDataWithFiles: FormData) => {
    try {
        const response = await postAd(formDataWithFiles);
        if (response.status === 200) {
            console.log('Post Ad successful:', response.data);
        }
    } catch (error) {
        const pleaseTryAgain = 'Something went wrong, please try again';
        console.error(`Posting-ad with error: `, error instanceof Error ? error.message : pleaseTryAgain);
        throw new Error(pleaseTryAgain);
    }
}
export default usePostAd;