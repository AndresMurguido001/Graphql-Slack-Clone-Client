import React from "react";
import { Button, Modal, Input, Form } from "semantic-ui-react";
import Downshift from "downshift";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";

// Add Style to dropdown (DOWNSHIFT) component to look more like slack

const DirectMessageModal = ({
  open,
  onClose,
  history,
  teamId,
  data: { loading, getTeamMembers }
}) => (
  <Modal onClose={onClose} open={open}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          {!loading && (
            <Downshift
              onChange={selectedUser =>
                history.push(`/viewTeam/user/${teamId}/${selectedUser.id}`)
              }
              itemToString={item => (item ? item.username : "")}
            >
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem
              }) => (
                <div>
                  <label {...getLabelProps()}>Search for a User</label>
                  <Input {...getInputProps()} fluid />
                  <ul {...getMenuProps()}>
                    {isOpen
                      ? getTeamMembers
                          .filter(
                            item =>
                              !inputValue || item.username.includes(inputValue)
                          )
                          .map((item, index) => (
                            <li
                              {...getItemProps({
                                key: item.id,
                                index,
                                item,
                                style: {
                                  backgroundColor:
                                    highlightedIndex === index
                                      ? "lightgray"
                                      : "white",
                                  fontWeight:
                                    selectedItem === item ? "bold" : "normal"
                                }
                              })}
                            >
                              {item.username}
                            </li>
                          ))
                      : null}
                  </ul>
                </div>
              )}
            </Downshift>
          )}
        </Form.Field>
        <Form.Field>
          <Button onClick={onClose} fluid content="Cancel" />
        </Form.Field>
      </Form>
    </Modal.Content>
  </Modal>
);
const getTeamMembersQuery = gql`
  query($teamId: Int!) {
    getTeamMembers(teamId: $teamId) {
      username
      id
    }
  }
`;

export default withRouter(
  graphql(getTeamMembersQuery, {
    options: {
      fetchPolicy: "cache-and-network"
    }
  })(DirectMessageModal)
);
