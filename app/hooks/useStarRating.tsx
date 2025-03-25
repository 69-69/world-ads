'use client'

import {useState} from 'react';
import StarRating from "@/app/components/StarRating";
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {HOME_ROUTE} from "@/app/hooks/useConstants";

// Post star rating
const postStarRating = async (star: number, postId: string) => {
    const {response, data} = await fetchWithRetry(`${HOME_ROUTE}/api/rating`, {
        method: 'POST',
        body: JSON.stringify({star, postId}),
    });
    console.log('Steve-PostStarRating:', response.ok);
}

export default function StarRatingClient({postId}: { postId: number | string }) {
    const [rating, setRating] = useState<number | null>(3);

    const handleRatingChange = (newValue: number | null) => {
        if (newValue !== null) {
            setRating(newValue);
            // Call the postStarRating function to submit the rating
            postStarRating(newValue, postId);
        }
    };

    return (
        <div>
            <h5>Rate this Product</h5>
            <StarRating value={rating} onChange={handleRatingChange}/>
            {rating !== null && <p>Your rating: {rating} stars</p>}
        </div>
    );
}
