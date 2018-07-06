import React from "react";
import Message from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import Sidebar from "../containers/Sidebar";


const ViewTeam = ({ match: { params }}) => (
    <AppLayout>          
        <Sidebar currentTeamId={params.teamId} />      
        <Header channelName="general" />
        <Message>
            <ul className="message-list">            
            <li></li>
            <li></li>
            </ul>
        </Message>
        <SendMessage channelName="general">
            <input type="text" placeholde="CSS grid layout module"/>
        </SendMessage>
    </AppLayout>
);
export default ViewTeam;
