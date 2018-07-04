import React ,{ Component } from "react";
import { observer } from "mobx-react";
import { extendObservable } from "mobx";
import { Container, Header, Form, Button, Divider, Label } from 'semantic-ui-react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

export default observer(class CreateTeam extends Component{
    constructor(props){
        super(props)
        extendObservable(this, {
            errors: {},
            name: "",
        })        
    }    
    onChange = (e) => {
        const { name, value } = e.target;
        this[name] = value;
    }
    render(){
        const { name,  errors: { nameError } } = this;
        return(           
            <Mutation mutation={createTeamMutation}>              
            {(createTeam, { loading, error }) => (                            
                <Container text>                
                <Form onSubmit={async (e) => {
                    this.nameError = "";
                    e.preventDefault();
                    try {
                        await createTeam({ variables: { name }});
                        this.props.history.push("/");
                    } catch(error){                        
                        this.props.history.push("/login");                        
                    }                        

                    }}>         
                <Link to="/">
                    <Button circular icon="home" style={{ float: "right" }} />
                </Link>            
                <Header as="h2">Create Team</Header>                    
                <Divider section />                                               
                    <Form.Field>
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
        errors{
            path
            message
        }
    }
}
`;
