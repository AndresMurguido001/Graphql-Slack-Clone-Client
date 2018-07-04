import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory'
//Middleware
const httpLink = createHttpLink({ uri: "http://localhost:8080/graphql"});

const middlewareLink = setContext(() => ({
    headers: {
        'x-token': localStorage.getItem("token"),
        'x-refreshToken': localStorage.getItem("refreshToken"),
    }
}))

const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
        const context = operation.getContext();
        const { response: { headers }} = context;
        if (headers) {
            const token = headers.get("x-token");
            const refreshToken = headers.get("x-refreshToken")
            if(token){
                localStorage.setItem("x-token", token);
            }
            if(refreshToken){
                localStorage.setItem("x-refreshToken", refreshToken);
            }
        }
        return response;
    })
})

const client = new ApolloClient({
    link: from([        
        middlewareLink,        
        afterwareLink, 
        httpLink,           
    ]),
    cache: new InMemoryCache(),
})


const App = (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
)

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
