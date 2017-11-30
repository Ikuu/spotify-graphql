const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const SimplifiedAlbums = require('./SimplifiedAlbum');
const SimplifiedArtist = require('./SimplifiedArtist');

const Track = new GraphQLObjectType({
  name: 'Track',

  fields: () => ({
    album: { type: new GraphQLList(SimplifiedAlbums) },
    artists: { type: new GraphQLList(SimplifiedArtist) },
    available_markets: { type: new GraphQLList(GraphQLString) },
    disc_number: { type: GraphQLInt },
    duration_ms: { type: GraphQLInt },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    preview_url: { type: GraphQLString },
  })
});

module.exports = Track;
