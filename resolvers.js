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
        }
    }
};