import { gql } from "apollo-boost";

export const QUERY_PRODUCTS = gql `query{
    allProject{
        id
        name
        addedDate
    }
} `;

export const MUTATION_ADD_PRODUCT = gql`
    mutation createProject($name: String!) {
        createProject (name: $name){
            project {
                id
                name
                addedDate
            }
        }
    }
    `;

    export const MUTATION_UPDATE_PRODUCT = gql`
    mutation updateProject($id:ID!, $name: String!) {
        updateProject (id: $id, name: $name){
            project {
                id
                name
                addedDate
            }
        }
    }
    `;