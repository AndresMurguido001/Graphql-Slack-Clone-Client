import React, { Component } from "react";
import { Container, Header, Form, Button, Divider, Label } from 'semantic-ui-react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

class Register extends Component {    
        state = {
            username: '',
            usernameError: "",
            email: '',
            emailError: "",
            password: '',
            passwordError: ""
        }        
    onChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    render(){
        const { username, email, password, usernameError, passwordError, emailError } = this.state;
        return(
            <Mutation mutation={registerUser}>            
            {(registerUser, {loading, error}) => (                               
                <Container text>
                    <Form onSubmit={async (e) => {
                        this.setState({
                            usernameError: "",
                            passwordError: "",
                            emailError: ""
                        })
                        e.preventDefault();
                        await registerUser({ variables: { username, email, password } })
                        .then(res => {
                            if (res.data.registerUser.ok){
                                this.props.history.push("/")
                            } else {
                                const { errors } = res.data.registerUser;
                                const err = {};
                                errors.forEach(({path, message}) => {
                                    err[`${path}Error`] = message;
                                })
                                this.setState(err);
                                console.log(this.state);
                            }
                        })
                    }}>
                    <Header as="h2">Register</Header>
                    <Divider section />
                        <Form.Field>
                        <Form.Input 
                            error={usernameError ? true : false }
                            placeholder='Enter Username' 
                            type='text' 
                            icon="user" 
                            name="username" 
                            value={username} 
                            onChange={this.onChange.bind(this)} />
                            { this.state.usernameError && (<Label basic pointing>
                                { this.state.usernameError }
                            </Label>)}
                        </Form.Field>                        
                        <Form.Field>
                        <Form.Input 
                            error={emailError ? true : false }
                            placeholder='Enter Email'
                            type='email' icon="mail"
                            name="email" value={email} 
                            onChange={this.onChange.bind(this)} />
                            { this.state.emailError && (<Label basic pointing>
                                { this.state.emailError }
                            </Label>)}
                        </Form.Field>                        
                        <Form.Field>
                        <Form.Input 
                            error={passwordError ? true : false }
                            placeholder='Enter Password' 
                            type='password'
                            icon="secret user" 
                            name="password" 
                            value={password} 
                            onChange={this.onChange.bind(this)} /> 
                            { this.state.passwordError && 
                            (<Label basic pointing >
                                { this.state.passwordError }
                            </Label>)}
                        </Form.Field> 
                        <Divider section />                                            
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
        registerUser(username: $username, password: $password, email: $email){
            ok           
            errors{
                path
                message
            }
        }
    }
    `
export default Register;