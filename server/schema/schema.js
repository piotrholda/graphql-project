const { User } = require('../model/User');
const { Post } = require('../model/Post');
const { Hobby } = require('../model/Hobby');

const graphql = require('graphql');
var _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql

const usersData = [
    {id: '1', name: 'Bond',age: 36, profession: 'Doctor'},
    {id: '13', name: 'Anna',age: 26, profession: 'Architect'},
    {id: '211', name: 'Bella',age: 16, profession: 'Developer'},
    {id: '19', name: 'Gina',age: 26, profession: 'Engineer'},
    {id: '150', name: 'Georgina',age: 36, profession: 'Prostitute'}
];

const hobbiesData = [
    {id: '1', title: 'Reading', description: 'Reading books', userId: '1'},
    {id: '2', title: 'Swimming', description: 'Ger in the water and don\'t sink', userId: '1'},
    {id: '3', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '13'},
    {id: '4', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '211'},
    {id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '19'},
    {id: '6', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '19'}
];

const postData = [
    {id: '1', comment: 'Building a mind', userId: '1'},
    {id: '2', comment: 'GraphQL is amazing', userId: '1'},
    {id: '3', comment: 'How to change the world', userId: '13'},
    {id: '4', comment: 'How to change the world', userId: '211'},
    {id: '5', comment: 'How to change the world', userId: '19'}
];

// Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: (property) => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve (parent, args) {
                return _.filter(postData, {userId: parent.id})
            }
        },
        hobbies: {
             type: new GraphQLList(HobbyType),
             resolve (parent, args) {
                 return _.filter(hobbiesData, {userId: parent.id})
             }
         }
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id:parent.userId})
            }
        }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post type',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id:parent.userId})
            }
        }
    })
});

// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args) {
               return _.find(usersData, {id: args.id})
            }
        },

        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return usersData
            }
        },

        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args) {
                return _.find(hobbiesData, {id: args.id})
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbiesData
            }
        },

        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                return _.find(postData, {id: args.id})
            }
        },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return postData
            }
        }

    }
});

// Mutations

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                profession: {type: GraphQLString}
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                });
                return user.save();
            }
        },

        updateUser: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                profession: {type: GraphQLString}
            },
            resolve(parent, args) {
                return updatedUser = User.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            age: args.age,
                            profession: args.profession
                        }
                    },
                    {new: true}
                );
            }
        },

        removeUser: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let removedUser = User.findByIdAndRemove(args.id).exec();
                if (!removedUser) {
                    throw new("Error: Unable to remove user.");
                }
                return removedUser;
            }
        },

        createPost: {
                    type: PostType,
                    args: {
                        comment: {type: new GraphQLNonNull(GraphQLString)},
                        userId: {type: new GraphQLNonNull(GraphQLID)}
                    },
                    resolve(parent, args) {
                        let post = new Post({
                                        comment: args.comment,
                                        userId: args.userId
                                    });
                        return post.save();
                    }
                },

        updatePost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                comment: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                return updatedPost = Post.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            comment: args.comment
                        }
                    },
                    {new: true}
                );
            }
        },

        removePost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let removedPost = Post.findByIdAndRemove(args.id).exec();
                if (!removedPost) {
                    throw new("Error: Unable to remove post.");
                }
                return removedPost;
            }
        },

        createHobby: {
                    type: HobbyType,
                    args: {
                        title: {type: new GraphQLNonNull(GraphQLString)},
                        description: {type: new GraphQLNonNull(GraphQLString)},
                        userId: {type: GraphQLID}
                    },
                    resolve(parent, args) {
                        let hobby = new Hobby({
                            title: args.title,
                            description: args.description,
                            userId: args.userId
                        });
                        return hobby.save();
                    }
                },

        updateHobby: {
            type: HobbyType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                        title: {type: new GraphQLNonNull(GraphQLString)},
                        description: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                return updatedHobby = Hobby.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            title: args.title,
                            description: args.description
                        }
                    },
                    {new: true}
                );
            }
        },

        removeHobby: {
            type: HobbyType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let removedHobby = Hobby.findByIdAndRemove(args.id).exec();
                if (!removedHobby) {
                    throw new("Error: Unable to remove hobby.");
                }
                return removedHobby;
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
