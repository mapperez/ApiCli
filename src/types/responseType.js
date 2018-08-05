import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import ErrorType from "./errorType";
import JsonObject from 'graphql-json-object-type';


const ResponseType = new GraphQLObjectType({
  name: "Response",
  description: 'Comunica respuestas de transacciones',
  fields: () => ({
    success: { type: GraphQLString },
    message: { type: GraphQLString },
    data: {type: JsonObject},
    errors:{ type: GraphQLList(ErrorType) }
  })
});

export default ResponseType
