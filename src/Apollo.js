import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
// import { createHttpLink } from "apollo-link-http";
import createFileLink from '../src/createFileLink'
import { ApolloLink, split } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
//Subscriptions Setup... Including(^ Httplink, split);
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
// Create a WebSocket link:
export const wsLink = new WebSocketLink({
  uri: `ws://localhost:8080/subscriptions`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => ({
      token: localStorage.getItem("token"),
      refreshToken: localStorage.getItem("refreshToken")
    }),
  }
});
//Middleware
const httpLink = createFileLink({ uri: "http://localhost:8080/graphql" });

const middlewareLink = setContext(() => ({
  headers: {
    "x-token": localStorage.getItem("token"),
    "x-refreshToken": localStorage.getItem("refreshToken")
  }
}));
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const {
      response: { headers }
    } = context;
    if (headers) {
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refreshToken");
      if (token) {
        localStorage.setItem("token", token);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    }
    return response;
  });
});

const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink)
);
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithMiddleware
);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;
