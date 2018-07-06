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
    const { headers } = operation.getContext();

        if (headers) {
        const token = headers.get('x-token');
        const refreshToken = headers.get('x-refresh-token');
            
        if (token) {
        localStorage.setItem('token', token);
        }

        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    }  
    return forward(operation);
});

const link = afterwareLink.concat(middlewareLink.concat(httpLink))

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
})


const App = (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
)

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
