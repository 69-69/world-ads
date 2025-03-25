import Container from "@mui/material/Container";
import {HOME_ROUTE} from "@/app/hooks/useConstants";
import StarRatingClient from "@/app/hooks/useStarRating";
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {Post} from "@/app/models/Post";
import Image from 'next/image'
import {BACKEND_BASE_URL, BACKEND_IMAGE_BASE_URL, BACKEND_MARKETPLACE_IMAGE_URL} from "@/env_config";

const PostAdsPage = async () => {
    const absoluteUrl = `${HOME_ROUTE}/api/steve`;
    // HOME_ROUTE+createPostHandler
    const {response, data} = await fetchWithRetry(absoluteUrl, {method: 'GET'});

    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
            <div>
                All Posts Page
                {
                    data.map((post: Post) => (
                        <div key={post.id}>
                            {
                                post.images.map((image, index) => {
                                    const img = BACKEND_BASE_URL + BACKEND_IMAGE_BASE_URL + BACKEND_MARKETPLACE_IMAGE_URL + '/resize/' + image;
                                    return (
                                        <Image key={index} src={img} alt={post.title} width={200} height={200}/>
                                    );
                                })
                            }
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            <StarRatingClient postId={post.id} />
                        </div>
                    ))
                }
            </div>
        </Container>
    )
}

export default PostAdsPage;


