import React from "react";
import Message from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import Sidebar from "../containers/Sidebar";
import findIndex from "lodash/findIndex";
import { Redirect } from 'react-router-dom';

import { allTeamsQuery } from '../graphql/team';
import { Query } from 'react-apollo';


const ViewTeam = ({ match: { params: { teamId, channelId } }}) => (
    <Query query={allTeamsQuery}>            
        {({ loading, error, data: { allTeams } }) => {        
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            if(!allTeams.length){
                return(<Redirect to="/createTeam" />)
            };
            //check teamid is int 
            let teamIdInt = parseInt(teamId, 10);            
            const teamIdx = teamIdInt ? findIndex(allTeams, ["id", teamIdInt ]) : 0 ;
            const team = allTeams[teamIdx];
            //check channel id is int
            let channelIdInt = parseInt(channelId, 10);
            const channelIdx = channelIdInt ? findIndex(team.channels, ["id", channelIdInt ]) : 0 ;
            const currentChannel = team.channels[channelIdx];
                return(
                    <AppLayout>          
                <Sidebar teams={allTeams.map(t => ({
                                    id: t.id,
                                    letter: t.name.charAt(0).toUpperCase()
                                }))} 
                                team={team}
                                />      
                { currentChannel && <Header channelName={currentChannel.name} /> }
                {currentChannel && <Message channelId={currentChannel.id} >
                    <ul className="message-list">            
                    <li></li>
                    <li></li>
                    </ul>
                </Message> }
                {currentChannel && <SendMessage channelName={currentChannel.name}>
                    <input type="text" placeholde="CSS grid layout module"/>
                </SendMessage> }
            </AppLayout>
                )        
        }}
    </Query>
);          
export default ViewTeam;
