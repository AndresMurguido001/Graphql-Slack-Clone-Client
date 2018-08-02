import React from "react";
import { Button, Modal, Input, Form } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import MultiSelectUsers from './MultiSelectUsers'
import { withFormik } from "../../node_modules/formik";
import { meQuery } from '../graphql/team';
import findIndex from 'lodash/findIndex'

import gql from 'graphql-tag'

// Add Style to dropdown (DOWNSHIFT) component to look more like slack

const DirectMessageModal = ({
  open,
  onClose,
  teamId,
  values,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  currentUserId,
  resetForm
}) => (
    <Modal onClose={onClose} open={open}>
      <Modal.Header>Direct Messaging</Modal.Header>
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
      getOrCreateChannel(members: $members, teamId: $teamId) {
        id
        name
      }
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
        history,
        resetForm
      }
    ) => {
      const response = await mutate({
        variables: { members, teamId },
        update: (store, { data: { getOrCreateChannel } }) => {
          const { id, name } = getOrCreateChannel;

          const data = store.readQuery({ query: meQuery });
          const teamIdx = findIndex(data.me.teams, ["id", teamId]);

          const notInChannelList = data.me.teams[teamIdx].channels.every(c => c.id !== id)
          if (notInChannelList) {
            data.me.teams[teamIdx].channels.push({
              __typename: "Channel",
              id,
              name,
              dm: true
            });
            store.writeQuery({ query: meQuery, data });
          }
          // history.push(`/viewTeam/${teamId}/${id}`)
        },
      }
      )
      onClose();
      resetForm();
    }
  })


)(DirectMessageModal)

