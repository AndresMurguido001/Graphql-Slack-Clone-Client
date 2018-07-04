import styled from "styled-components";
import React from "react";
import { Input } from "semantic-ui-react";


const MessageWrapper = styled.div`
    grid-column: 3;
    grid-row: 3;
    margin: 20px;
`;

export default ({channelName}) => (
    <MessageWrapper>
        <Input fluid placeholder={`Message # ${channelName}`} />
        </MessageWrapper>
)