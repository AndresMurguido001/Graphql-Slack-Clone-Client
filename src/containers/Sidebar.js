import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import findIndex from "lodash/findIndex";
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';


const allTeamsQuery = gql`
{   
    allTeams{
        id
        name
        channels{
            name
            id
        }
    }
}
`;

class Sidebar extends React.Component {
    state = {
        openAddChannelModal: false,
    }
    handleCloseAddChannelModal = () => {
        this.setState({
            openAddChannelModal: false
        })
    }
    handleAddChannelClick = () => {
        this.setState({
            openAddChannelModal: true
        })
    }
    render(){
        const { currentTeamId } = this.props;       
        return(    
            <Query query={allTeamsQuery}>
        {({ loading, error, data }) => {        
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            let allCurrentTeams = data.allTeams;                  
            const teamIdx = currentTeamId ? findIndex(allCurrentTeams, function(o) { return o.id == currentTeamId; }) : 0 ; 
            console.log(teamIdx);            
            const team = data.allTeams[teamIdx]; 
            let username = '';
            try {
                let token = localStorage.getItem("token")
                const { user } = decode(token);
                username = user.username;
            } catch(err){}
    
            return [              
                <Teams key="team-sidebar" teams={data.allTeams.map(t => ({
                    id: t.id,
                    letter: t.name.charAt(0).toUpperCase()
                }))} />,
                <Channels 
                key="channels-sidebar"
                teamName={team.name}
                username={username} 
                channels={team.channels}                
                users={[ {id: 1, name: "SlackBot"}, {id: 2, name: "user1"} ]}
                onAddChannelClick={this.handleAddChannelClick} />,
                <AddChannelModal
                teamId={currentTeamId} 
                key="sidebar-add-channel-modal" 
                onClose={this.handleCloseAddChannelModal} 
                open={this.state.openAddChannelModal} />          
            ]           
        }}    
        </Query>
        )
    }   
}


export default Sidebar;