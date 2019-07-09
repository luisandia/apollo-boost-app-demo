const jwt = require('jsonwebtoken');

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
            const allRecipes = await Recipe.find();
            return allRecipes;
        }
    },
    Mutation: {
        addRecipe: async (root, args, ctx) => {
            const { name, description, category, instructions, username } = args;
            const { Recipe } = ctx;

            const newRecipe = await new Recipe({ name, description, category, instructions, username }).save();
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
        }
    }
};