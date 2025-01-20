import React, {use} from 'react'

const ProductByCategoryPage = ({params}: { params: Promise<{ category: string }> }) => {
    const {category} = use(params);

    return (
        <div>Dynamic product category by {category} route Page</div>
    )
}
export default ProductByCategoryPage
