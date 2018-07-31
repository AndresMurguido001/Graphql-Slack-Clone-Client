import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Comment } from "semantic-ui-react";

import FileUpload from '../components/FileUpload'
import RenderTextFile from '../components/RenderTextFile'

const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      url
      filetype
      created_at
    }
  }
`;

const Message = ({ message: { url, text, filetype } }) => {
  if (url) {
    if (filetype.startsWith("image/")) {
      return <img src={url} alt="" />
    } else if (filetype.startsWith("text/")) {
      return <RenderTextFile url={url} />
    } else if (filetype.startsWith("audio/")) {
      return (
        <div>
          <audio controls>
            <source src={url} type={filetype} />
          </audio>
        </div>
      )
    }
  }
  return (<Comment.Text>{text}</Comment.Text>)
};

class MessageContainer extends React.Component {
  UNSAFE_componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.channelId);
  }

  UNSAFE_componentWillReceiveProps({ channelId }) {
    let currentChannel = this.props.channelId;
    if (currentChannel !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  subscribe = channelId =>
    this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId: channelId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev.messages;
        }
        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage]
        };
      }
    });

  render() {
    const {
      data: { loading, messages },
      channelId
    } = this.props;
    return loading ? null : (
      <FileUpload style={{
        gridColumn: 3,
        gridRow: 2,
        paddingLeft: "20px",
        paddingRight: "20px",
        display: "flex",
        flexDirection: "column-reverse",
        overflowY: "auto",
      }} channelId={channelId} disableClick>
        <Comment.Group>
          {console.log(messages)}
          {messages.map(m => (
            <Comment key={`${m.id}-message`}>
              <Comment.Content>
                <Comment.Author as="a">{m.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{m.created_at}</div>
                </Comment.Metadata>
                <Message message={m} />
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </FileUpload>
    );
  }
}

const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      url
      filetype
      created_at
    }
  }
`;

export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId
  }),
  fetchPolicy: "network-only"
})(MessageContainer);
