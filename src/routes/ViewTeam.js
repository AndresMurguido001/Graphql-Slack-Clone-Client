import React from "react";
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import findIndex from "lodash/findIndex";
import Sidebar from "../containers/Sidebar";
import MessageContainer from "../containers/MessageContainer";
import { Redirect } from 'react-router-dom';

import { allTeamsQuery } from '../graphql/team';
import { Query } from 'react-apollo';


const ViewTeam = ({ match: { params: { teamId, channelId } }}) => (
    <Query query={allTeamsQuery}>            
        {({ loading, error, data: { allTeams, invitedToTeams } }) => {        
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            const teams = [...allTeams, ...invitedToTeams ]
            if(!teams.length){
                return(<Redirect to="/createTeam" />)
            };
            //check teamid is int 
            let teamIdInt = parseInt(teamId, 10);            
            const teamIdx = teamIdInt ? findIndex(teams, ["id", teamIdInt ]) : 0 ;
            const team = teamIdx === -1 ? teams[0] : teams[teamIdx];
            //check channel id is int
            let channelIdInt = parseInt(channelId, 10);
            const channelIdx = channelIdInt ? findIndex(team.channels, ["id", channelIdInt ]) : 0 ;
            const currentChannel = channelIdx === -1 ? team.channels[0] : team.channels[channelIdx];
                return(
                    <AppLayout>          
                <Sidebar teams={teams.map(t => ({
                                    id: t.id,
                                    letter: t.name.charAt(0).toUpperCase()
                                }))} 
                                team={team}
                                />      
                { currentChannel && <Header channelName={currentChannel.name} /> }
                {currentChannel && (<MessageContainer channelId={currentChannel.id} />)}
                {currentChannel && (<SendMessage channelName={currentChannel.name} channelId={currentChannel.id} />)}
            </AppLayout>
                )        
        }}
    </Query>
);          
export default ViewTeam;
