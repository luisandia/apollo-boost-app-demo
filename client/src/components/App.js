import React from 'react';
import './App.css';
import { GET_ALL_RECIPES } from '../queries';
import { Query } from 'react-apollo';
import RecipeItem from './Recipes/RecipeItem';



function App() {
  return (
    <div className="App">
      <h1>
        Home
      </h1>
      <Query query={GET_ALL_RECIPES}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>
          if (error) return <div>Error</div>
          return (
            <ul>{data.getAllRecipes.map(recipe =>
              <RecipeItem key={recipe._id} {...recipe} />
            )}</ul>
          )
        }}
      </Query>
    </div>
  );
}

export default App;
