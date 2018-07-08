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
    handleCloseAddChannelModal = () => {
        this.setState({
            openAddChannelModal: false
        })             
    }
    handleCloseInvitePeople = () => {
        this.setState({
            openInvitePeopleModal: false
        })             
    }
    handleAddChannelClick = () => {
        this.setState({
            openAddChannelModal: true
        })
    }
    handleInvitePeopleClick = () => {
        this.setState({
            openInvitePeopleModal: true
        })
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
                onAddChannelClick={this.handleAddChannelClick}
                onInvitePeopleClick={this.handleInvitePeopleClick} />,
                <AddChannelModal
                teamId={team.id} 
                key="sidebar-add-channel-modal" 
                onClose={this.handleCloseAddChannelModal} 
                open={openAddChannelModal} />,         
                <InvitePeopleModal
                teamId={team.id}                
                key="invite-people-modal" 
                onClose={this.handleCloseInvitePeople} 
                open={openInvitePeopleModal} />
            ]             
};
}


export default Sidebar;