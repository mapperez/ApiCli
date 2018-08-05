import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLInt } from "graphql";
import UsuarioType from "../types/usuarioType";


const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "Operaciones de consultas",
  fields: {
    // Usuarios
    getUsuario: {
      type: UsuarioType,
      description: "Obtiene usuario por ID",
      args: { _id: { type: GraphQLID } },
      resolve: (parent, args, { db, user, acceso }) => {
        return db.Usuario.findOne(args);
      }
    },
    getUsuarios: {
      type: new GraphQLList(UsuarioType),
      description: "Obtiene lista de usuarios",
      resolve: (parent, args, { db, user, acceso }) => {
        return db.Usuario.find();
      }
    }
  }
});

export default RootQuery;
