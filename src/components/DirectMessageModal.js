import React from "react";
import { Button, Modal, Input, Form } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import MultiSelectUsers from './MultiSelectUsers'
import { withFormik } from "../../node_modules/formik";
import gql from 'graphql-tag'

// Add Style to dropdown (DOWNSHIFT) component to look more like slack

const DirectMessageModal = ({
  open,
  onClose,
  teamId,
  values,
  handleSubmit,
  isSubmitting,
  resetForm,
  setFieldValue,
  currentUserId,

}) => (
    <Modal onClose={onClose} open={open}>
      <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <MultiSelectUsers currentUserId={currentUserId} type="button" value={values.members} handleChange={(e, { value }) => setFieldValue("members", value)} teamId={teamId} placeholder="Choose members to message" />
          </Form.Field>
          <Form.Field>
            <Form.Group>
              <Button disabled={isSubmitting} onClick={e => {
                resetForm()
                onClose(e)
              }} fluid content="Cancel" />
              <Button onClick={handleSubmit} type="submit" disabled={isSubmitting} fluid content="Start Messaging" />
            </Form.Group>
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );

const getOrCreateChannelMutation = gql`
    mutation($members: [Int!]!, $teamId: Int!){
      getOrCreateChannel(members: $members, teamId: $teamId)
    }
  `;


export default compose(
  withRouter,
  graphql(getOrCreateChannelMutation),
  withFormik({
    mapPropsToValues: props => ({ members: [] }),
    // Submission handler
    handleSubmit: async (
      { members },
      {
        props: {
          teamId,
          onClose,
          mutate,
        },
        setSubmitting,
      }
    ) => {
      const response = await mutate({ variables: { members, teamId } })
      console.log(response);
      onClose();
      setSubmitting(false);
    }
  })


)(DirectMessageModal)

