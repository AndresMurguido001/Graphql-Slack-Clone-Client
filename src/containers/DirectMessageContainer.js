import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Comment } from "semantic-ui-react";

import Messages from "../components/Messages";

const newDirectMessageSubscription = gql`
  subscription($teamId: Int!, $userId: Int!) {
    newDirectMessage(teamId: $teamId, userId: $userId) {
      id
      text
      sender {
        username
      }
      created_at
    }
  }
`;

class DirectMessageContainer extends React.Component {
  UNSAFE_componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.teamId, this.props.userId);
  }

  UNSAFE_componentWillReceiveProps({ teamId, userId }) {
    let currentTeam = this.props.teamId;
    let currentUserChatting = this.props.userId
    if (currentTeam !== teamId || currentUserChatting !== userId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(teamId, userId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  subscribe = (teamId, userId) =>
    this.props.data.subscribeToMore({
      document: newDirectMessageSubscription,
      variables: {
        teamId,
        userId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev.messages;
        }
        return {
          ...prev,
          directMessages: [...prev.directMessages, subscriptionData.data.newDirectMessage]
        };
      }
    });
  render() {
    const {
      data: { loading, directMessages }
    } = this.props;
    return loading ? null : (
      <Messages>
        <Comment.Group>
          {directMessages.map(m => (
            <Comment key={`${m.id}-directMessage`}>
              <Comment.Content>
                <Comment.Author as="a">{m.sender.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{m.created_at}</div>
                </Comment.Metadata>
                <Comment.Text>{m.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Messages>
    );
  }
}

const directMessagesQuery = gql`
  query($teamId: Int!, $userId: Int!) {
    directMessages(teamId: $teamId, otherUserId: $userId) {
      id
      text
      sender {
        username
      }
      created_at
    }
  }
`;

export default graphql(directMessagesQuery, {
  options: (props) => ({
    variables: {
      teamId: props.teamId,
      userId: props.userId
    },
    fetchPolicy: "network-only"
  }),
})(DirectMessageContainer);
