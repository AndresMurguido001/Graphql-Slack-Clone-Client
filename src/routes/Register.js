import React, { Component } from "react";
import { Container, Header, Form, Button } from 'semantic-ui-react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

class Register extends Component {    
        state = {
            username: '',
            email: '',
            password: ''
        }        
    onChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    render(){
        const { username, email, password } = this.state;
        return(
            <Mutation mutation={registerUser}>
            {(registerUser, {loading, error}) => (
                <Container text>
                    <Form onSubmit={(e) => {
                        e.preventDefault;
                        registerUser({ variables: { username, email, password } })
                    }}>
                        <Header as="h2">Register</Header>
                        <Form.Input placeholder='Enter Email' type='email' icon="mail" name="email" value={email} onChange={this.onChange.bind(this)} />
                        <Form.Input placeholder='Enter Password' type='password' icon="secret user" name="password" value={password} onChange={this.onChange.bind(this)} />
                        <Form.Input placeholder='Enter Username' type='text' icon="user" name="username" value={username} onChange={this.onChange.bind(this)} />
                        <Button>
                            Register for your account                        
                        </Button>
                    </Form>
                </Container>
                )}
                </Mutation>
        );
    }
} 
const registerUser = gql`
    mutation($username:String!, $email:String!, $password:String!){
        registerUser(username: $username, password: $password, email: $email)
        }
    `
export default Register;