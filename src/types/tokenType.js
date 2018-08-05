import { GraphQLObjectType, GraphQLString } from "graphql";
import JsonObject from "graphql-json-object-type";

const TokenType = new GraphQLObjectType({
  name: "Token",
  description: 'Genera token de acceso',
  fields: () => ({
    success: { type: GraphQLString },
    message: { type: GraphQLString },
    token: { type: GraphQLString },
    data: {type: JsonObject}
  })
});

export default TokenType;
