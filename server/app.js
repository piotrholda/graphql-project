const dbPassword = require('./dbPassword.js');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

const testSchema = require('./schema/types_schema');

mongoose.connect('mongodb+srv://pholda:' + dbPassword.password() + '@cluster0.p5ltl6w.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('We are connected');
});
const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

app.listen(4000, () => {
    console.log('Listening for requests on port 4000')
})