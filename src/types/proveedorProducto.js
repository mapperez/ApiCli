import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLInt
  
} from "graphql";
import ProveedorType from "./proveedorType";
import ProductoType from "./productoType";

const proveedorProductoType = new GraphQLObjectType({
  name: "ProveedorProducto",
  description: "Tipo Producto por Proveedor",
  fields: () => ({
    _id: { type: GraphQLID },
    productoId: { type: GraphQLID },
    proveedorId: { type: GraphQLID },
    precio: {type: GraphQLInt},
    calidad: {type: GraphQLInt},
    proveedor: {
      type: ProveedorType,
      resolve(parent, args, { db }) {
        return db.Proveedor.findOne({ _id: parent.proveedorId });
      }
    },
    producto: {
      type: ProductoType,
      resolve(parent, args, { db }) {
        return db.Producto.findOne({ _id: parent.productoId });
      }
    }
  })
});

export default proveedorProductoType;
