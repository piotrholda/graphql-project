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
    GraphQLFloat,
    GraphQLNonNull
} = graphql

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'Represents a person type',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLInt},
        isMarried: {type: GraphQLBoolean},
        gpa: {type: GraphQLFloat},

        justAType: {
            type: Person,
            resolve(parent, args) {
                return parent;
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        person: {
            type: Person,
            //args: {id: {type: GraphQLString}},

            resolve(parent, args) {
                let personObj = {
                    name: 'Sam',
                    age: 34,
                    isMarried: true,
                    gpa: 4.0
                };
               return personObj;
            }
        },

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})