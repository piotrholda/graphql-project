const graphql = require('graphql');
var _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean,
    GraphQLFloat
} = graphql

// Scalar type
/*
String = GraphQLString
int
Float
Boolean
ID
*/

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'Represents a person type',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        isMarried: {type: GraphQLBoolean},
        gpa: {type: GraphQLFloat}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})