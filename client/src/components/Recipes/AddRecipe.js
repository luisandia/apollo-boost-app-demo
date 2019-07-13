import React from 'react'
import { Mutation } from 'react-apollo';
import Error from '../Error';
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';


const initialState = {
    name: "",
    instructions: "",
    category: "Breakfast",
    description: "",
    username: ""
}

class AddRecipe extends React.Component {

    state = { ...initialState }

    componentDidMount() {
        console.log(this.props);
        this.setState({
            username: this.props.session.getCurrentUser.username
        })
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    validateForm = () => {
        const { name, category, description, instructions } = this.state;
        const isInvalid = !name || !category || !description || !instructions;
        return isInvalid;
    }
    handleSubmit = (e, addRecipe) => {
        e.preventDefault();
        addRecipe().then(({ data: { addRecipe } }) => {
            console.log(addRecipe);
            this.clearState();
            this.props.history.push("/");
        });
    }

    clearState = () => {
        this.setState({ ...initialState });
    }

    updateCache = (cache, { data: { addRecipe } }) => {
        const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES })
        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        })
    }

    render() {
        const { name, category, description, instructions, username } = this.state;
        return <Mutation mutation={ADD_RECIPE} variables={{ name, category, description, instructions, username }}
            update={this.updateCache}
            refetchQueries={() => [
                { query: GET_USER_RECIPES, variables: { username } },

            ]}
        >
            {(addRecipe, { data, loading, error }) => {
                return (
                    <div className="App">
                        <h2 className="App">Add Recipe</h2>
                        <form className="form" onSubmit={e => this.handleSubmit(e, addRecipe)}>
                            <input type="text" name="name" placeholder="Recipe Name" onChange={this.handleChange} value={name} />
                            <select name="category" onChange={this.handleChange} value={category}>
                                <option value="Breakfast">BreakFast</option>
                                <option value="Lunk">Lunch</option>
                                <option value="Dinner">Snack</option>
                                <option value="Snack">Snack</option>
                            </select>
                            <input type="text" name="description" placeholder="Add description" onChange={this.handleChange} value={description} />
                            <textarea name="instructions" placeholder="Add instructions" onChange={this.handleChange} value={instructions}></textarea>
                            <button
                                type="submit"
                                className="button-primary"
                                disabled={loading || this.validateForm()}>
                                Submit
                            </button>
                            {error && <Error error={error} />}
                        </form>
                    </div>
                )
            }}
        </Mutation>
    }
}

export default withAuth(session => session && session.getCurrentUser)(
    withRouter(AddRecipe)
);
