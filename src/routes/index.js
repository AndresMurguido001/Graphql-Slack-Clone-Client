import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
    } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
//Components    
import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeams from './CreateTeams';
import ViewTeam from './ViewTeam';


const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
        jwt_decode(token);
        jwt_decode(refreshToken);
    } catch(err){
        return false;
    }
    return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
            <Component {...props} />
            ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    }}
                />
            )
        }
    />
);

export default () => (
    <Router>
        <Switch>
            <Route exact path = "/" component={ Home }/>
            <Route exact path = "/register" component={ Register }/>
            <Route exact path = "/login" component={ Login }/>
            <Route exact path = "/viewTeam" component={ ViewTeam }/>
            <PrivateRoute exact path = "/createTeam" component={ CreateTeams }/>
        </Switch>
    </Router>
)
