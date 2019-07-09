import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql',
    fetchOptions: { credentials: 'include' },
    request: operation => {
        const token = localStorage.getItem('token');
        console.log("mi token")
        console.log(token)
        operation.setContext({
            headers: { authorization: token }
        });
    },
    onError: ({ networkerror }) => {
        if (networkerror) {
            console.log("Network Error", networkerror);
            if (networkerror.statusCode === 401) {
                localStorage.removeItem('token')
            }
        }
    }
});

// const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     uri: 'http://localhost:4444/graphql',
//     request: async operation => {
//         const token = localStorage.getItem('token');
//         console.log("mi token ")
//         console.log(token)
//         operation.setContext({
//             fetchOptions: {
//                 credentials: 'include'
//             }
//         });
//     }
// });
const Root = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/" />
        </Switch>
    </Router>
)

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root />
    </ApolloProvider>
    ,
    document.getElementById('root')
);
