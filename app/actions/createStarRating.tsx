'use client'

import {useState} from 'react';
import StarRating from "@/app/components/StarRating";
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {HOME_ROUTE} from "@/app/util/constants";
import {reviewHandler} from "@/app/util/endPoints";

// Post star rating
const postStarRating = async (star: number, post_id: number | string) => {
    const payload = {
        star: star.toString(),
        post_id: post_id.toString(),
    };
    alert('Rating submitted '+payload.star);

    await fetchWithRetry(HOME_ROUTE + reviewHandler, {method: 'POST', body: JSON.stringify(payload)});
}

export default function StarRatingClient({postId}: { postId: number | string }) {
    const [rating, setRating] = useState<number | null>(3);

    const handleRatingChange = (newValue: number | null) => {
        if (newValue !== null) {
            setRating(newValue);
            // Call the postStarRating function to submit the rating
            postStarRating(newValue, postId).then(() => {
                console.log('Rating submitted successfully');
            });
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
