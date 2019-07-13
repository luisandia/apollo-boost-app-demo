import React from 'react';
import { GET_RECIPE } from '../../queries';
import { Query } from 'react-apollo';
import LikeRecipe from './LikeRecipe';

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
                    const { _id, category, description, instructions, likes, username } = data.getRecipe;
                    return (
                        <div className="App">
                            <h2>{data.getRecipe.category}</h2>
                            <p>Category: {category}</p>
                            <p>Description: {description}</p>
                            <p>Instructions: {instructions}</p>
                            <p>Likes:{likes}</p>
                            <p>Created By: {username}</p>
                            <LikeRecipe _id={_id} />
                        </div>
                    )
                }}
        </Query>
    )
}
export default RecipePage;