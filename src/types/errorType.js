import { GraphQLObjectType, GraphQLString } from "graphql";


const ErrorType = new GraphQLObjectType({
  name: "Error",
  description:"Tipo Error",
  fields: () => ({
    path: { type: GraphQLString },
    message: { type: GraphQLString }
  })
});

export default ErrorType;
