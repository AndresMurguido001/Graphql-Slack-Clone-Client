import React from 'react';
import decode from 'jwt-decode';


import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';




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
        const { team, teams } = this.props;               
            let username = '';           
            let token = localStorage.getItem("token")
            const { user } = decode(token);
            username = user.username;
            return [              
            <Teams key="team-sidebar" teams={teams} />,
                <Channels 
                key="channels-sidebar"
                teamName={team.name}
                username={username} 
                teamId={team.id}
                channels={team.channels}                
                users={[ {id: 1, name: "SlackBot"}, {id: 2, name: "user1"} ]}
                onAddChannelClick={this.handleAddChannelClick} />,
                <AddChannelModal
                teamId={team.id} 
                key="sidebar-add-channel-modal" 
                onClose={this.handleCloseAddChannelModal} 
                open={this.state.openAddChannelModal} />          
            ]              
};
}


export default Sidebar;