import { gql } from "apollo-boost";

export const QUERY_PROJECTS = gql `query{
    allProject{
        id
        name
        addedDate
        description
        phase
        estimatedDate
        closedDate
    }
} `;

export const MUTATION_ADD_PROJECT = gql`
    mutation createProject($name: String!, $estimatedDate: String, $phase: String!, $description: String) {
        createProject (name: $name, estimatedDate: $estimatedDate, phase: $phase, description: $description){
            project {
                id
                name
                addedDate
                description
                phase
                estimatedDate
                closedDate
            }
        }
    }
    `;

    export const MUTATION_UPDATE_PROJECT = gql`
    mutation updateProject($id:ID!, $name: String!, $estimatedDate: String, $phase: String!, $description: String) {
        updateProject (id: $id, name: $name, estimatedDate: $estimatedDate, phase: $phase, description: $description){
            project {
                id
                name
                addedDate
                description
                phase
                estimatedDate
                closedDate
            }
        }
    }
    `;