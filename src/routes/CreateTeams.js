import React ,{ Component } from "react";
import { observer } from "mobx-react";
import { extendObservable } from "mobx";
import { Container, Header, Form, Button, Divider, Message } from 'semantic-ui-react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

export default observer(class CreateTeam extends Component{
    constructor(props){
        super(props)
        extendObservable(this, {            
            name: "",
            errors: {}
        })        
    }    
    onChange = (e) => {
        const { name, value } = e.target;
        this[name] = value;
    }
    render(){
        const { name, errors: { nameError } } = this;
        const errList = [];
        if (nameError){
            errList.push(nameError);
        }        
        return(           
            <Mutation mutation={createTeamMutation}>              
            {(createTeam, { loading, error }) => (                            
                <Container text>                
                <Form onSubmit={async (e) => {                    
                    let response = null;
                    try {
                        response = await createTeam({ variables: { name }});
                    } catch(error){
                        this.props.history.push('/login');
                        return;         
                    }                        
                const { ok, errors, team } = response.data.createTeam;
                if (ok) {
                    this.props.history.push(`/viewTeam/${team.id}`);
                } else {
                    const err = {};
                    errors.forEach(({ path, message }) => {
                        err[`${path}Error`] = message;
                    });
                    this.errors = err;
                    
                }                
                    }}>         
                <Link to="/">
                    <Button circular icon="home" style={{ float: "right" }} />
                </Link>            
                <Header as="h2">Create Team</Header>                    
                <Divider section />                                               
                    <Form.Field error={!!nameError}>
                    <Form.Input
                        placeholder='Enter Team Name'
                        type='text' icon="users"
                        name="name" value={name} 
                        onChange={this.onChange} />                                                
                    </Form.Field> 
                    <Button>
                        Create Your Team
                    </Button>
                </Form>
                {nameError ? (
                <Message error header="There was some errors with your submission" list={errList} />
                ) : null}
            </Container>
            )}                                          
            </Mutation>
                
        )
    }
})

const createTeamMutation = gql`
mutation($name: String!){
    createTeam(name: $name){
        ok
        team {
            id
        }
        errors{
            path
            message
        }
    }
}
`;
