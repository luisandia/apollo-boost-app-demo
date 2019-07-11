import React from 'react'
import { Link } from 'react-router-dom';



const RecipeItem = (recipe) => {
    const { _id, name, category } = recipe;
    return (
        <li>
            <Link to={`/Recipes/${_id}`}>
                <h4>
                    {name}
                </h4>
            </Link>
            <p><strong>{category}</strong></p>
        </li>
    )
}

export default RecipeItem
