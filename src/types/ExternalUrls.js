const { GraphQLObjectType, GraphQLString } = require("graphql");

const ExternalUrls = new GraphQLObjectType({
  name: "ArtistExternalUrls",
  description: "...",

  fields: () => ({
    spotify: { type: GraphQLString },
  }),
});

module.exports = ExternalUrls;
