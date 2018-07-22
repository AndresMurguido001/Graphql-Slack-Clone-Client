import React from "react";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import AddChannelModal from "../components/AddChannelModal";
import InvitePeopleModal from "../components/InvitePeopleModal";
import DirectMessageModal from "../components/DirectMessageModal";

class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
    openDirectMessageModal: false
  };
  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      openAddChannelModal: !prevState.openAddChannelModal
    }));
  };
  toggleInvitePeopleModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      openInvitePeopleModal: !prevState.openInvitePeopleModal
    }));
  };
  toggleDirectMessageModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      openDirectMessageModal: !prevState.openDirectMessageModal
    }));
  };
  render() {
    const { team, teams, username } = this.props;
    const {
      openAddChannelModal,
      openInvitePeopleModal,
      openDirectMessageModal
    } = this.state;
    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        username={username}
        teamId={team.id}
        channels={team.channels}
        isOwner={team.admin}
        users={team.directMessageMembers}
        onAddChannelClick={this.toggleAddChannelModal}
        onInvitePeopleClick={this.toggleInvitePeopleModal}
        onDirectMessageClick={this.toggleDirectMessageModal}
      />,
      <AddChannelModal
        teamId={team.id}
        key="sidebar-add-channel-modal"
        onClose={this.toggleAddChannelModal}
        open={openAddChannelModal}
      />,
      <DirectMessageModal
        teamId={team.id}
        key="sidebar-add-direct-message-modal"
        onClose={this.toggleDirectMessageModal}
        open={openDirectMessageModal}
      />,
      <InvitePeopleModal
        teamId={team.id}
        key="invite-people-modal"
        onClose={this.toggleInvitePeopleModal}
        open={openInvitePeopleModal}
      />
    ];
  }
}

export default Sidebar;
