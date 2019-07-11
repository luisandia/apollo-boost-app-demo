import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Navbar from './components/Navbar';
import withSession from './components/withSession';
import Search from './components/Recipes/Search';
import AddRecipe from './components/Recipes/AddRecipe';
import Profile from './components/profile/Profile';
import RecipePage from './components/Recipes/RecipePage';

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

const Root = ({ refetch, session }) => (
    <Router>
        <Fragment>

            <Navbar session={session} />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/search" component={Search} />
                <Route path="/recipe/add" component={AddRecipe} />
                <Route path="/recipes/:_id" component={RecipePage} />
                <Route path="/profile" component={Profile} />
                <Route path="/signin" render={() => <Signin refetch={refetch} />} />
                <Route path="/signup" render={() => <Signup refetch={refetch} />} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </Router>
)

const RootWithSession = withSession(Root);

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>
    ,
    document.getElementById('root')
);
