import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import GridBackground from "./components/ui/GridBackground.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Determine the GraphQL endpoint based on environment
const isDevelopment = import.meta.env.DEV;
const serverIP = "92.112.180.30"; // Your server IP address

const graphqlURI = isDevelopment
  ? "http://localhost:4000/graphql"
  : `http://${serverIP}:4000/graphql`;

console.log(`Using GraphQL endpoint: ${graphqlURI}`);

const client = new ApolloClient({
  uri: graphqlURI,
  cache: new InMemoryCache(), // Apollo Client uses to cache query results after fetching them.
  credentials: "include", // This tells Apollo Client to send cookies along with every request to the server.
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GridBackground>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GridBackground>
    </BrowserRouter>
  </React.StrictMode>
);
