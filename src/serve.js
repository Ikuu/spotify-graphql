const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const schema = require('./schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000);
console.log('App started');
