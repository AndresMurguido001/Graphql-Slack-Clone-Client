import React from "react";
import Message from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import Sidebar from "../containers/Sidebar";
import findIndex from "lodash/findIndex";

import { allTeamsQuery } from '../graphql/team';
import { Query } from 'react-apollo';


const ViewTeam = ({ match: { params: { teamId, channelId } }}) => (
    <Query query={allTeamsQuery}>            
        {({ loading, error, data: { allTeams } }) => {        
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;                              
            const teamIdx = !!teamId ? findIndex(allTeams, ["id", parseInt(teamId, 10)]) : 0 ;
            const team = allTeams[teamIdx];
            const channelIdx = !!channelId ? findIndex(team.channels, ["id", parseInt(channelId, 10)]) : 0 ;
            const currentChannel = team.channels[channelIdx];
                return(
                    <AppLayout>          
                <Sidebar teams={allTeams.map(t => ({
                                    id: t.id,
                                    letter: t.name.charAt(0).toUpperCase()
                                }))} 
                                team={team}
                                />      
                <Header channelName={currentChannel.name} />
                <Message channelId={currentChannel.id} >
                    <ul className="message-list">            
                    <li></li>
                    <li></li>
                    </ul>
                </Message>
                <SendMessage channelName={currentChannel.name}>
                    <input type="text" placeholde="CSS grid layout module"/>
                </SendMessage>
            </AppLayout>
                )        
        }}
    </Query>
);          
export default ViewTeam;
