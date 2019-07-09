require('dotenv').config({
    path: '.env'
});
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const http = require('http');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(() => {
    console.log("DB UP!");
}).catch((e) => {
    console.error(e);
});


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));

app.use(async (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token, typeof token);
    if (token !== null) {
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            console.log(currentUser);
        }
        catch (err) {
            console.error(err);
        }
    }
    next();
})

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: { User, Recipe }
});



server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

//Run app, then load http://localhost:PORT in a browser to see the output.