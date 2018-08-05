import { GraphQLObjectType, GraphQLString , GraphQLID, GraphQLBoolean} from "graphql";
import { GraphQLDateTime } from "../../node_modules/graphql-custom-types";




const UsuarioType = new GraphQLObjectType({
  name: "Usuario",
  description: 'Tipo Usuario',
  fields: () => ({
    _id: {type: GraphQLID},
    nombre: { type: GraphQLString },
    email: { type: GraphQLString },
    pwd: { type: GraphQLString },
    role: {type: GraphQLString},
    activo: {type: GraphQLBoolean},
    createdAt: {type: GraphQLDateTime},
    updatedAt: {type: GraphQLDateTime}
  })
});




export default UsuarioType
