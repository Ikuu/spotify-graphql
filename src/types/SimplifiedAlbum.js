const fetch = require('node-fetch');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const ExternalUrls = require('./ExternalUrls');
const SimplifiedArtist = require('./SimplifiedArtist');

const SimplifiedAlbum = new GraphQLObjectType({
  name: 'Album',
  description: '...',

  fields: () => ({
    artists: { type: new GraphQLList(SimplifiedArtist) },
    name: { type: GraphQLString },
  }),
})

module.exports = SimplifiedAlbum;
