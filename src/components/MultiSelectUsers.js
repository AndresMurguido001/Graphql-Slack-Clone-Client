import React from 'react'
import { getTeamMembersQuery } from '../graphql/team'
import { Dropdown } from 'semantic-ui-react'
import { graphql } from 'react-apollo';

const MultiSelectUsers = ({ data: { loading, getTeamMembers = [] }, value, handleChange, placeholder, currentUserId }) => (loading ? null : (

    <Dropdown
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        fluid multiple selection
        options={getTeamMembers
            .filter(tm => tm.id !== currentUserId)
            .map(tm => ({ key: tm.id, value: tm.id, text: tm.username }))} />

));
// getTeamMembers.filter(tm => tm.id !== currentUserId).map(tm => ({ key: tm.id, text: tm.username, value: tm.id }))
export default graphql(getTeamMembersQuery, { options: ({ teamId }) => ({ variables: { teamId } }) })(MultiSelectUsers);