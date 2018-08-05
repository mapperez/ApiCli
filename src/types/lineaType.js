import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID} from "graphql";
import CategoriaType from "./categoriaType";


const LineaType = new GraphQLObjectType({
  name: "Linea",
  description:"Tipo Linea",
  fields: () => ({
    _id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    categorias: {
        type: GraphQLList(CategoriaType),
        resolve: (parent, args, { db })=> {
            return db.Categoria.find({lineaId: parent._id})
        }
    }
  })
});

export default LineaType;