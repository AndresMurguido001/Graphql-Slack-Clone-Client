import styled from "styled-components";
import React from 'react';
import { Link } from 'react-router-dom';

const TeamWrap = styled.div`
    grid-column: 1;
    grid-row: 1 / 4;
    background-color: #362233;
    color: #958993;
`;

const TeamList = styled.ul`
    width: 100%;
    padding-left: 0;
    list-style: none;
`;
const TeamListItem = styled.li`
    height: 50px;
    width: 50px;
    background-color: #676066;
    color: #fff;
    margin: auto;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border-radius: 11px;
    &:hover {
        border-style: solid;
        border-width: thick;
        border-color: #767676;
    }
`;

const team = ({id, letter}) => (
    <Link key={`team-${id}`} to={`/viewTeam/${id}/`}>
        <TeamListItem>
            {letter}
        </TeamListItem>
    </Link>
    
)

export default ({teams}) => (
    <TeamWrap>        
            <TeamList>
            {teams.map(team)}
            </TeamList>                    
    </TeamWrap>
)