import gql from "graphql-tag"

export const allTeamsQuery = gql`
{   
    allTeams{
        id
        name
        owner         
        channels{
            name
            id
        }
    }
    invitedToTeams {
        id
        name
        owner      
        channels{
            name
            id
        }
    }
}
`;