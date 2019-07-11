import React from 'react'
const handleChange = e => {

}
class AddRecipe extends React.Component {

    handleChange = e => {
    }

    render() {
        return (
            <div className="App">
                <h2 className="App">Add Recipe</h2>
                <form className="form">
                    <input type="text" name="name" placeholder="Recipe Name" onChange={this.handleChange} />
                    <select name="category" onChange={this.handleChange}>
                        <option value="Breakfast">BreakFast</option>
                        <option value="Lunk">Lunch</option>
                        <option value="Dinner">Snack</option>
                        <option value="Snack">Snack</option>
                    </select>
                    <input type="text" name="description" placeholder="Add description" onChange={this.handleChange} />
                    <textarea name="instructions" placeholder="Add instructions" onChange={this.handleChange}></textarea>
                </form>
            </div>
        )
    }
}

export default AddRecipe
