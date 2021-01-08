import React from "react";
import { useQuery } from "react-apollo";

import { QUERY_PRODUCTS } from "../../core/queries";

const ProductList = () => {
    const {loading, data, error} = useQuery(QUERY_PRODUCTS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <ul>
            {data.allProject.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
    )
}

export default ProductList;