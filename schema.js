const { gql } = require('apollo-server-express');

module.exports = gql`

type Recipe {
    _id:ID,
    name:String!,
    imageUrl:String!,
    category:String!,
    description:String!,
    instructions:String!
    createdDate:String,
    likes: Int
    username:String
}

type User {
    _id:ID,
    username:String!,
    password:String!,
    email:String!,
    joinDate:String,
    favorites:[Recipe]
}
type Query{
    users:[User!],
    getAllRecipes:[Recipe],
    getCurrentUser:User,
    getRecipe(_id:ID!):Recipe,
    searchRecipes(searchTerm: String):[Recipe],
    getUserRecipes(username:String):[Recipe]
}

type Token{
    token:String!
}

type Mutation{
    addRecipe(name:String!,imageUrl:String!,description:String!,category:String!, instructions:String!,username:String!):Recipe,
    signupUser(username:String!,email:String!,password:String!):Token
    signinUser(username:String!, password: String!):Token
    deleteUserRecipe(_id:ID):Recipe,
    likeRecipe(_id:ID!,username:String!):Recipe
    unlikeRecipe(_id:ID!,username:String!):Recipe
}

`;