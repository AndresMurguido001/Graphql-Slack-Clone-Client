import React from 'react'
import { Button, Modal, Input, Form } from 'semantic-ui-react'
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const createChannelMutation = gql`
    mutation($teamId: Int!, $name: String!){
        createChannel(teamId: $teamId, name: $name)
    }
`;

const AddChannelModal = ({ 
    open, 
    onClose,  
    values,  
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting, }) => (
<Modal onClose={onClose} open={open}>
    <Modal.Header>Add Channel</Modal.Header>        
        <Modal.Content>
        <Form>
        <Form.Field>
            <Input fluid values={values.name} onChange={handleChange} onBlur={handleBlur} label='#' name="name" placeholder='Your Channel' />
        </Form.Field>
        <Form.Field>
            <Form.Group widths="equal">
            <Button disabled={isSubmitting} onClick={handleSubmit} fluid content='Create Your Channel' />              
            <Button disabled={isSubmitting} onClick={onClose} fluid content='Cancel' />   
            </Form.Group>
        </Form.Field>
        </Form>
    </Modal.Content>             
</Modal>
)

export default compose(
    graphql(createChannelMutation),
    withFormik({    
    mapPropsToValues: props => ({ name: '' }),
    // Submission handler
    handleSubmit: async (
        values,        
        {
        props: {
                teamId,
                mutate,
                onClose,
            },
            setSubmitting,      
        }
        ) => {
            console.log(teamId);
            await mutate({ variables: { teamId: teamId, name: values.name }});                                 
            onClose();
            setSubmitting(false);
        }
    }))(AddChannelModal);