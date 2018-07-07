import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const allUsers = gql`
    {
        allUsers{
            id
            email
        }
    }
`

const Home = () => (
    <div>
        <Button.Group>
            <Link to="/login">
                <Button>Login</Button>
            </Link>
                <Button.Or />
            <Link to="/register">
                <Button positive>Register</Button>
            </Link>
        </Button.Group>
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
    </div>
)



export default Home;