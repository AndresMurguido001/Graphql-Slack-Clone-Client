import React from 'react'
import { Button, Modal, Input, Form } from 'semantic-ui-react'
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import normalizeErrors from '../normalizeErrors';

const addTeamMemberMutation = gql`
mutation($email: String!, $teamId: Int!){
    addTeamMember(email: $email, teamId: $teamId){
        ok
        errors{
            path
            message
        }
    }
}  
`;

const InvitePeopleModal = ({
    open,
    onClose,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    touched,
    errors,
}) => (
        <Modal onClose={onClose} open={open}>
            <Modal.Header>Add Team Member</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <Input fluid values={values.email} onChange={handleChange} onBlur={handleBlur} label='#' name="email" placeholder='Add Someone to your team' />
                    </Form.Field>
                    {touched.email && errors.email && <div><p>{errors.email}</p></div>}
                    <Form.Field>
                        <Form.Group widths="equal">
                            <Button disabled={isSubmitting} type="submit" onClick={handleSubmit} fluid content='Submit' />
                            <Button disabled={isSubmitting} type="button" onClick={onClose} fluid content='Cancel' />
                        </Form.Group>
                    </Form.Field>
                </Form>
            </Modal.Content>
        </Modal>
    )

export default compose(
    graphql(
        addTeamMemberMutation,
    ),
    withFormik({
        mapPropsToValues: props => ({ email: '' }),
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
                setErrors
            }
        ) => {
            const response = await mutate({
                variables: {
                    teamId: teamId,
                    email: values.email
                },
            })
            const { ok, errors } = response.data.addTeamMember;
            if (ok) {
                onClose();
                setSubmitting(false);
            } else {
                setSubmitting(false);
                setErrors(normalizeErrors(errors.map(e =>
                    e.message === "user_id must be unique" ? ({
                        path: "email",
                        message: "This user is already part of your team"
                    }) : e
                )));
            }
        }
    }))(InvitePeopleModal);