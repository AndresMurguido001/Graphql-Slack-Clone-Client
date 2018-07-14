import styled from "styled-components";
import React from "react";
import { Input } from "semantic-ui-react";
import { withFormik } from 'formik';
import gql from "../../node_modules/graphql-tag";
import { graphql, compose } from 'react-apollo';


const MessageWrapper = styled.div`
    grid-column: 3;
    grid-row: 3;
    margin: 20px;
`;

const createMessageMutation = gql`
mutation($channelId:Int!, $text: String!){
    createMessage(channelId: $channelId, text: $text)
}
`;

const SendMessage = ({
    channelName,
    open, 
    onClose,  
    values,  
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
            }) => (
    <MessageWrapper>
        <Input name="message" value={values.message} onChange={handleChange} onBlur={handleBlur} onKeyDown={(e) => {
            if ( e.keyCode === 13 && !isSubmitting ){
                handleSubmit(e);
            }
        }} fluid placeholder={`Message # ${channelName}`} />
        </MessageWrapper>
)

export default compose(
    graphql(createMessageMutation),
    withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async ( values, { props: { channelId, mutate }, resetForm, setSubmitting }) => {
            if (!values.message || !values.message.trim()){
                setSubmitting(false);
                return;
            }
            await mutate({
                variables: {
                    channelId,
                    text: values.message 
                },                
            })                                                       
            resetForm(false);
        },
    }),
)(SendMessage)