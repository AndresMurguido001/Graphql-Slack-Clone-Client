import React ,{ Component } from "react";
import { observer } from "mobx-react";
import { extendObservable } from "mobx";
import { Container, Header, Form, Button, Divider, Label } from 'semantic-ui-react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export default observer(class Login extends Component{
    constructor(props){
        super(props)
        extendObservable(this, {
            email: "",
            password: "",
        })        
    }    
    onChange = (e) => {
        const { name, value } = e.target;
        this[name] = value;
    }
    render(){
        const { email, password } = this;
        return(           
            <Mutation mutation={loginMutation}>  
            {(login, { loading, error }) => (
                <Container text>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    login({ variables: {email, password}})
                    .then(res => {
                        const { ok, token, refreshToken } = res.data.login;
                        localStorage.setItem("token", token);
                        localStorage.setItem("refreshToken", refreshToken);
                    })
                                    
                }}>                     
                <Header as="h2">Login</Header>                    
                <Divider section />                                               
                    <Form.Field>
                    <Form.Input 
                        placeholder='Enter Email'
                        type='email' icon="mail"
                        name="email" value={email} 
                        onChange={this.onChange} />                          
                    </Form.Field>                        
                    <Form.Field>
                    <Form.Input 
                        placeholder='Enter Password' 
                        type='password'
                        icon="secret user" 
                        name="password" 
                        value={password} 
                        onChange={this.onChange} />                             
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
