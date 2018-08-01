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

export const getTeamMembersQuery = gql`
  query($teamId: Int!) {
    getTeamMembers(teamId: $teamId) {
      username
      id
    }
  }
`;
