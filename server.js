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
const path = require('path');
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


const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async (request) => {
        const token = request.req ? request.req.headers.authorization : request.connection ? request.connection.context.authorization : null;
        let currentUser = null;
        console.log(token, typeof token);
        if (token !== "null") {
            try {
                currentUser = await jwt.verify(token, process.env.SECRET);
                console.log(currentUser);
            }
            catch (err) {
                console.error(err);
            }
        }
        return { currentUser, User, Recipe };
    }
});



server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

//Run app, then load http://localhost:PORT in a browser to see the output.