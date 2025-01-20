import React, {use} from 'react'

const AdsBySlugPage = ({param}: { param: Promise<{ slug: string }> }) => {
    const {slug} = use(param)

    return (
        <div>Ads By {slug} Page</div>
    )
}
export default AdsBySlugPage
