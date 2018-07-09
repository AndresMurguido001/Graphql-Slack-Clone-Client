import React from 'react';
import decode from 'jwt-decode';


import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';




class Sidebar extends React.Component {
    state = {
        openAddChannelModal: false,
        openInvitePeopleModal: false,
    }
    toggleAddChannelModal = (e) => {
        if(e){
            e.preventDefault();
        }
        this.setState(prevState => ({
            openAddChannelModal: !prevState.openAddChannelModal
        }))             
    }    
    toggleInvitePeopleModal = (e) => {
        if (e){
            e.preventDefault();                
        }
        this.setState(prevState => ({
            openInvitePeopleModal: !prevState.openInvitePeopleModal
        }))
    }
    render(){
        const { team, teams } = this.props; 
        const { openAddChannelModal, openInvitePeopleModal } = this.state;              
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
                onAddChannelClick={this.toggleAddChannelModal}
                onInvitePeopleClick={this.toggleInvitePeopleModal} />,
                <AddChannelModal
                teamId={team.id} 
                key="sidebar-add-channel-modal" 
                onClose={this.toggleAddChannelModal} 
                open={openAddChannelModal} />,         
                <InvitePeopleModal
                teamId={team.id}                
                key="invite-people-modal" 
                onClose={this.toggleInvitePeopleModal} 
                open={openInvitePeopleModal} />
            ]             
};
}


export default Sidebar;