import React from "react";
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Message from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Header from '../components/Header';


export default () => (
    <AppLayout>
        <Teams teams={[ {id: 1, letter: "T" }, { id: 2, letter: "B" } ]} />
        <Channels 
        teamName="Team Name" 
        username="username" 
        channels={[ { id: 1, name: "general"}, { id: 2, name: "otherStuff"} ]}
        users={[ {id: 1, name: "SlackBot"}, {id: 2, name: "user1"} ]} />
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
)