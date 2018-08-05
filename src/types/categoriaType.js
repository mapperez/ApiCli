import { GraphQLObjectType, GraphQLString , GraphQLID} from "graphql";
import LineaType from "./lineaType";

const CategoriaType = new GraphQLObjectType({
  name: "Categoria",
  description: "Tipo Categoria",
  fields: () => ({
    _id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    linea: {
      type: LineaType,
      resolve: (parent, args, { db }) => {
        return db.Linea.findOne({_id: parent.lineaId});
      }
    }
  })
});

export default CategoriaType;
