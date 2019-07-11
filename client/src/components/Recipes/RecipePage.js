import React from 'react';
import { withRouter } from 'react-router-dom';
import { GET_RECIPE } from '../../queries';
import { Query } from 'react-apollo';


const RecipePage = ({ match }) => {
    const { _id } = match.params;
    return (

        <Query query={GET_RECIPE} variables={{ _id }}>

            {
                ({ data, loading, error }) => {
                    if (loading) return <div>
                        loading
                    </div>
                    if (error) return <div>Error</div>

                    const { category, description, instructions, likes, username } = data.getRecipe;
                    return (
                        <div className="App">
                            <h2>{data.getRecipe.category}</h2>
                            <p>Category: {category}</p>
                            <p>Description: {description}</p>
                            <p>Instructions: {instructions}</p>
                            <p>Likes:{likes}</p>
                            <p>Created By: {username}</p>
                            <button>Like</button>
                        </div>
                    )
                }}
        </Query>
    )
}
export default RecipePage;