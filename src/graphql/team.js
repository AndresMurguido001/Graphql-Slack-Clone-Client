import gql from "graphql-tag"

export const meQuery = gql`
{   
    me {
    username
    id
    teams{
        id
        admin
        name         
            channels{
                name
                id
            }
        }
    }
}
`;