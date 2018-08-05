import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} from "graphql";
import ProveedorProductoType from "./proveedorProducto";
import ImagenType from "./imagenType";
import CategoriaType from "./categoriaType";
import LineaType from "./lineaType";

const ProductoType = new GraphQLObjectType({
  name: "Producto",
  description: "Tipo Producto",
  fields: () => ({
    _id: { type: GraphQLID },
    lineaId: { type: GraphQLID },
    categoriaId: { type: GraphQLID },
    codInterno: { type: GraphQLInt},
    marca: { type: GraphQLString },
    modelo: { type: GraphQLString },
    nombre: { type: GraphQLString },
    medidas: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    activo: { type: GraphQLBoolean },
    linea: {
      type: LineaType,
      resolve: (parent, args, { db }) =>{
        db.Linea.findOne({_id: parent.lineaId});
      }
    },   
    categoria: {
      type: CategoriaType,
      resolve: (parent, args, { db }) =>{
        db.Categoria.findOne({_id: parent.categoriaId});
      }
    },
    proveedores: {
      type: GraphQLList(ProveedorProductoType),
      resolve(parent, args, { db }) {
        return db.ProveedorProducto.find({ productoId: parent._id });
      }
    },
    imagenes: {
      type: GraphQLList(ImagenType),
      resolve(parent, args, { db }) {
        return db.Imagen.find({ productoId: parent._id });
      }
    }
  })
});

export default ProductoType;
