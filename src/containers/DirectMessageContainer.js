import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Comment } from "semantic-ui-react";

import Messages from "../components/Messages";

// const newChannelMessageSubscription = gql`
//   subscription($channelId: Int!) {
//     newChannelMessage(channelId: $channelId) {
//       id
//       text
//       user {
//         username
//       }
//       created_at
//     }
//   }
// `;

class DirectMessageContainer extends React.Component {
  //   componentWillMount() {
  //     this.unsubscribe = this.subscribe(this.props.channelId);
  //   }

  //   componentWillReceiveProps({ channelId }) {
  //     let currentChannel = this.props.channelId;
  //     if (currentChannel !== channelId) {
  //       if (this.unsubscribe) {
  //         this.unsubscribe();
  //       }
  //       this.unsubscribe = this.subscribe(channelId);
  //     }
  //   }

  //   componentWillUnmount() {
  //     if (this.unsubscribe) {
  //       this.unsubscribe();
  //     }
  //   }
  //   subscribe = channelId =>
  //     this.props.data.subscribeToMore({
  //       document: newChannelMessageSubscription,
  //       variables: {
  //         channelId: channelId
  //       },
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) {
  //           return prev.messages;
  //         }
  //         return {
  //           ...prev,
  //           messages: [...prev.messages, subscriptionData.data.newChannelMessage]
  //         };
  //       }
  //     });

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
  variables: props => ({
    teamId: props.teamId,
    userId: props.userId
  }),
  fetchPolicy: "network-only"
})(DirectMessageContainer);
