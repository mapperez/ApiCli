import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} from "graphql";
import { GraphQLDateTime } from "../../node_modules/graphql-custom-types";
import ProductoType from "./productoType";

const productolisType = new GraphQLObjectType({
  name: "ProductoLis",
  description: "Productos Paginados",
  fields: () => ({
    docs: { type: GraphQLList(ProductoType) },
    total: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    page: { type: GraphQLInt },
    pages: { type: GraphQLInt }
  })
});

export default productolisType;
