import { gql } from "apollo-boost";

export const QUERY_PRODUCTS = gql `query{
    allProject{
        id
        name
    }
} `;