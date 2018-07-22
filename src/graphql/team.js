import gql from "graphql-tag";

export const meQuery = gql`
  {
    me {
      username
      id
      teams {
        id
        admin
        directMessageMembers {
          id
          username
        }
        name
        channels {
          name
          id
        }
      }
    }
  }
`;
