import React from 'react'
import { Button, Modal, Input, Form } from 'semantic-ui-react'
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { allTeamsQuery } from '../graphql/team';
import findIndex from 'lodash/findIndex'


const createChannelMutation = gql`
    mutation($teamId: Int!, $name: String!){
        createChannel(teamId: $teamId, name: $name){
            ok
            channel {
                name
                id
            }            
        }
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
    graphql(
        createChannelMutation,        
    ),
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
            await mutate({
                variables: {
                    teamId: teamId,
                    name: values.name 
                },
                optimisticResponse: {
                    createChannel: {
                        __typename: "Mutation",
                        ok: true,
                        channel: {
                            __typename: "Channel",
                            id: -1,
                            name: values.name
                        }                       
                    }
                },
                update: (store, { data: { createChannel } }) => {
                    const { ok, channel } = createChannel;
                    if(!ok){
                        return;
                    }                    
                    const data = store.readQuery({ query: allTeamsQuery });
                    console.log(data);
                    const teamIdx = findIndex(data.allTeams, ["id", teamId]);
                    data.allTeams[teamIdx].channels.push(channel);
                    store.writeQuery({ query: allTeamsQuery, data });
                },
            })                                                       
            onClose();
            setSubmitting(false);
        }
    }))(AddChannelModal);