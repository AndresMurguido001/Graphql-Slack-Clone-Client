import styled from "styled-components";
import React from "react";
import { Header } from "semantic-ui-react";


const HeaderWrap = styled.div`
    grid-column: 3;
    grid-row: 1;
`;
export default ({ channelName }) => (
    <HeaderWrap>
        <Header as="h1" textAlign="center"># {channelName}</Header>    
    </HeaderWrap>
)