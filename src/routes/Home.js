import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const allUsers = gql`
    {
        allUsers{
            id
            email
        }
    }
`

const Home = () => (
    <Query query={allUsers}>
    {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :( { error.response }</p>;

        return data.allUsers.map((user) => (
        <div key={user.id}>
            <p>{`id: ${user.id}`}</p>
            <p>{`email: ${user.email}`}</p>
        </div>
        ));
    }}
    </Query>
)



export default Home;