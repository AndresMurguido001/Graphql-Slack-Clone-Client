import React from 'react';
import Message from '../components/Messages'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react'

const messagesQuery = gql`
query($channelId:Int!){
    messages(channelId: $channelId){
        id
        text
        user{
            username
        }
        created_at
    }    
}
`;

const MessageContainer =  ({ data: { loading, messages } }) => (loading ? null :
    <Message>
        <Comment.Group>
            {messages.map(x => (
            <Comment key={x.id}>
                <Comment.Content>
                    <Comment.Author as='a'>{x.user.username}</Comment.Author>
                    <Comment.Metadata>
                        <div>{x.created_at}</div>
                    </Comment.Metadata>
                    <Comment.Text>{x.text}</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
            ))}
        </Comment.Group>
    </Message>);
export default graphql(messagesQuery, {
    variables: props => ({
        channelId: props.channelId
    })
})(MessageContainer);