import React, {use} from 'react'

const SearchPage = ({params}: { params: Promise<{ query: string }> }) => {
    const {query} = use(params);

    return (
        <div style={{height: '50vh'}}>Dynamic search results for {query} Page</div>
    )
}
export default SearchPage
