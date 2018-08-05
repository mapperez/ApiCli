import { GraphQLObjectType, GraphQLString , GraphQLID} from "graphql";
import { GraphQLDateTime } from "../../node_modules/graphql-custom-types";
import PerfilEnum from "./perfilEmun";



const UsuarioType = new GraphQLObjectType({
  name: "Usuario",
  description: 'Tipo Usuario',
  fields: () => ({
    _id: {type: GraphQLID},
    nombre: { type: GraphQLString },
    email: { type: GraphQLString },
    pwd: { type: GraphQLString },
    perfil: {type: PerfilEnum},
    createdAt: {type: GraphQLDateTime},
    updatedAt: {type: GraphQLDateTime}
  })
});




export default UsuarioType
