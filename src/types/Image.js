const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const Image = new GraphQLObjectType({
  name: "ArtistImage",
  description: "Artist image",

  fields: () => ({
    height: { type: GraphQLInt },
    url: { type: GraphQLString },
    width: { type: GraphQLInt },
  }),
});

module.exports = Image;
