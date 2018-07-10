import React from 'react';
import Message from '../components/Messages'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const messagesQuery = gql`
query($channelId:Int!){
    messages(channelId: $channelId){
        id
        text
        user{
            username
        }
        createdAt
    }    
}
`;

const MessageContainer =  ({ data: { loading, messages } }) => (loading ? null : <Message>{JSON.stringify(messages)}</Message>);
export default graphql(messagesQuery, {
    variables: props => ({
        channelId: props.channelId
    })
})(MessageContainer);