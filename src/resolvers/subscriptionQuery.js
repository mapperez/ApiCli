import {
    GraphQLObjectType,
    GraphQLString
} from "graphql";



const SubscriptionType = new GraphQLObjectType({
  name: "SubscriptionType",
  description: "Test",
  fields: {
    subscribeToTest: {
      type: GraphQLString,
      description: "Subscribe to the test type",
      args: {
        id: { type: GraphQLString }
      }
    }
  }
});

export default SubscriptionType;