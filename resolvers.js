const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn });
}

module.exports = {
    Query: {
        users: async (root, args, { User }) => {
            const users = await User.find({})
            return users;

        },
        getAllRecipes: async (root, args, { Recipe }) => {
            const allRecipes = await Recipe.find().sort({ createdDate: 'desc' });
            return allRecipes;
        },
        getCurrentUser: async (root, args, { currentUser, User }) => {
            if (!currentUser) {
                return null;
            }
            const user = await User.findOne({ username: currentUser.username })
                .populate({
                    path: "favorites",
                    model: "Recipe"
                });
            return user;
        },
        getRecipe: async (root, { _id }, { Recipe }) => {
            const recipe = await Recipe.findOne({ _id });
            return recipe;
        },
        searchRecipes: async (root, { searchTerm }, { Recipe }) => {
            if (searchTerm) {
                const searchResults = await Recipe.find({
                    $text: { $search: searchTerm }
                },
                    {
                        score: { $meta: "textScore" }
                    }).sort({
                        score: { $meta: "textScore" }
                    });
                return searchResults;
            } else {
                const recipes = await Recipe.find().sort({
                    ilikes: 'desc', createdDate: 'desc'
                });
                return recipes;
            }
        },
        getUserRecipes: async (root, { username }, { Recipe }) => {
            console.log(username)
            const userRecipes = await Recipe.find({ username }).sort({ createdDate: 'desc' });
            return userRecipes;
        }

    },
    Mutation: {
        addRecipe: async (root, args, ctx) => {
            const { name, description, imageUrl, category, instructions, username } = args;
            const { Recipe } = ctx;

            const newRecipe = await new Recipe({ name, description, imageUrl, category, instructions, username }).save();
            return newRecipe;
        },
        signupUser: async (root, { username, email, password }, { User }) => {
            const user = await User.findOne({ username, email, password });
            if (user) {
                throw new Error('User already exists');
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            return { token: createToken(newUser, process.env.SECRET, '1hr') };
        },
        signinUser: async (root, { username, password }, { User }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error("User not found");
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error("Invalid password");
            }
            return { token: createToken(user, process.env.SECRET, '1hr') };
        },
        deleteUserRecipe: async (root, { _id }, { Recipe }) => {
            const recipe = Recipe.findOneAndRemove({ _id });
            return recipe;

        },
        likeRecipe: async (root, { _id, username }, { Recipe, User }) => {
            const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
            await User.findOneAndUpdate({ username }, { $addToSet: { favorites: _id } });
            return recipe;
        },
        unlikeRecipe: async (root, { _id, username }, { Recipe, User }) => {
            const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: -1 } });
            await User.findOneAndUpdate({ username }, { $pull: { favorites: _id } });
            return recipe;
        }
    }
};