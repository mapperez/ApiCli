import { GraphQLObjectType, GraphQLString , GraphQLID,GraphQLList, GraphQLInt} from "graphql";
import { GraphQLEmail,GraphQLDateTime } from "../../node_modules/graphql-custom-types";
import JsonObject from 'graphql-json-object-type';
import ProveedorProductoType from "./proveedorProducto";

const ProveedorType = new GraphQLObjectType({
  name: "Proveedor",
  description: 'Tipo Proveedor',
  fields: () => ({
    _id: {type: GraphQLID},
    rut:  { type: GraphQLString },
    razon_social:  { type: GraphQLString },
    direccion:  { type: GraphQLString },
    geolocation:  { type: JsonObject },
    comuna:  { type: GraphQLString },
    telefono:  { type: GraphQLString },
    calidad: {type: GraphQLInt},
    productos: {
      type: GraphQLList(ProveedorProductoType),
      resolve(parent, args, { db }) {
        return db.ProveedorProducto.find({ proveedorId: parent._id });
      }
    },
    email:  { type: GraphQLEmail },
    createdAt: {type: GraphQLDateTime},
    updatedAt: {type: GraphQLDateTime}

  })
});

export default ProveedorType;
