import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import PerfilEnum from "./perfilEmun";
import JsonObject from 'graphql-json-object-type';

const AccesoType = new GraphQLObjectType({
  name: "Acceso",
  description:"Acceso a rutas",
  fields: () => ({
    _id: { type: GraphQLID },
    usuarioId: { type: GraphQLID },
    perfil: { type: PerfilEnum },
    acceso: {type: JsonObject},
    createdAt: {type: GraphQLDateTime},
    updatedAt: {type: GraphQLDateTime}
  })
});

export default AccesoType;
