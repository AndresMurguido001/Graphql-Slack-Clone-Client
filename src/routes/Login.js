import React, { Component } from "react";
import { observer } from "mobx-react";
import { extendObservable } from "mobx";
import { Container, Header, Form, Button, Divider, Label } from 'semantic-ui-react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { wsLink } from '../Apollo'

export default observer(class Login extends Component {
    constructor(props) {
        super(props)
        extendObservable(this, {
            email: "",
            errors: {},
            password: "",
        })
    }
    onChange = (e) => {
        const { name, value } = e.target;
        this[name] = value;
    }
    render() {
        const { email, password, errors: { emailError, passwordError } } = this;
        return (
            <Mutation mutation={loginMutation}>
                {(login, { loading, error }) => (
                    <Container text>
                        <Form onSubmit={(e) => {
                            this.emailError = "";
                            this.passwordError = "";
                            e.preventDefault();
                            login({ variables: { email, password } })
                                .then(res => {
                                    const { ok, token, refreshToken, errors } = res.data.login;
                                    if (ok) {
                                        localStorage.setItem("token", token);
                                        localStorage.setItem("refreshToken", refreshToken);
                                        wsLink.subscriptionClient.tryReconnect();
                                        this.props.history.push("/viewTeam");
                                    }
                                    if (errors) {
                                        const err = {};
                                        errors.forEach(({ path, message }) => {
                                            err[`${path}Error`] = message;
                                        })

                                        this.errors = err;
                                    }

                                })

                        }}>
                            <Link to="/">
                                <Button circular icon="home" style={{ float: "right" }} />
                            </Link>
                            <Header as="h2">Login</Header>
                            <Divider section />
                            <Form.Field>
                                <Form.Input
                                    error={emailError ? true : false}
                                    placeholder='Enter Email'
                                    type='email' icon="mail"
                                    name="email" value={email}
                                    onChange={this.onChange} />
                                {emailError && (<Label basic pointing>
                                    {emailError}
                                </Label>)}
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    error={passwordError ? true : false}
                                    placeholder='Enter Password'
                                    type='password'
                                    icon="secret user"
                                    name="password"
                                    value={password}
                                    onChange={this.onChange} />
                                {passwordError && (<Label basic pointing>
                                    {passwordError}
                                </Label>)}
                            </Form.Field>
                            <Divider section />
                            <Button>
                                Login to your account
                    </Button>
                        </Form>
                    </Container>
                )}
            </Mutation>

        )
    }
})

const loginMutation = gql`
mutation($email: String!, $password: String!){
    login(email: $email, password:$password){
        ok
        token
        refreshToken
        errors{
            path
            message
        }
    }
}
`;
