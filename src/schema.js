const fetch = require("node-fetch");
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const grabToken = require('./grabToken');
const Artist = require('./types/Artist');
const { API_URL } = require('./config');

const defaults = {
  limit: 5,
  offset: 0,
};

const SearchResultArtist = new GraphQLObjectType({
  name: "SearchResultArtist",
  description: '...',

  fields: () => ({
    href: { type: GraphQLString },
    items: { type: new GraphQLList(Artist) },
    limit: { type: GraphQLInt },
    next: { type: GraphQLString, resolve: (root) => `GraphQLize: ${root.next}` },
    offset: { type: GraphQLInt },
    previous: { type: GraphQLString },
    total: { type: GraphQLInt },
  }),
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "query",
    description: "Implementation of the SpotifyAPI using GraphQL",

    fields: () => ({
      artists: {
        type: SearchResultArtist,
        args: {
          limit: { type: GraphQLInt },
          name: { type: GraphQLString },
          offset: { type: GraphQLInt },
        },
        resolve: (root, args, context) => {
          return grabToken()
            .then(token => {
              const options = {
                limit: () => {
                  // TODO: Move this to args[?]
                  if (!args.limit) return defaults.limit;

                  if (args.limit > 50) {
                    return 50;
                  } else {
                    return args.limit;
                  }
                },
                offset: args.offset || defaults.offset,
              }

              return fetch(`${API_URL}/search?q=${args.name}&type=artist&limit=${options.limit()}&offset=${options.offset}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              })
                .then(response => response.json())
                .then(json => json.artists)
            });
        }
      },

      artistById: {
        type: Artist,
        description: 'Search for artist by Spotify ID.',
        args: {
          country: { type: GraphQLString },
          id: { type: GraphQLString },
        },
        resolve: (root, args, context) => {
          return grabToken()
          .then(token => {
            return fetch(`${API_URL}/artists/${args.id}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
              .then(response => response.json())
          });
        }
      }
    })
  })
});
