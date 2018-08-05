import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLInt } from "graphql";
import UsuarioType from "../types/usuarioType";
import ProveedorType from "../types/proveedorType";
import isAuthenticatedResolver from "../funciones/permision";
import ProductoType from "../types/productoType";
import productolisType from "../types/productolisType";
import LineaType from "../types/lineaType";
import CategoriaType from "../types/categoriaType";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "Operaciones de consultas",
  fields: {
    // Usuarios
    getUsuario: {
      type: UsuarioType,
      description: "Obtiene usuario por ID",
      args: { _id: { type: GraphQLID } },
      resolve: isAuthenticatedResolver.createResolver(
        (parent, args, { db, user, acceso }) => {
          if (acceso.getUsuario && acceso.activo) {
            return db.Usuario.findOne(args);
          } else {
            return null;
          }
        }
      )
    },
    getUsuarios: {
      type: new GraphQLList(UsuarioType),
      description: "Obtiene lista de usuarios",
      resolve: isAuthenticatedResolver.createResolver(
        (parent, args, { db, user, acceso }) => {
          if (acceso.getUsuarios && acceso.activo) {
            return db.Usuario.find();
          } else {
            return null;
          }
        }
      )
    },
    // <-- fin -->

    // Proveedor
    getProveedor: {
      type: ProveedorType,
      description: "Obtiene Proveedor por ID",
      args: { _id: { type: GraphQLID } },
      resolve: isAuthenticatedResolver.createResolver(
        (parent, args, { db, user, acceso }) => {
          if (acceso.getProveedor && acceso.activo) {
            return db.Proveedor.findOne(args);
          } else {
            return null;
          }
        }
      )
    },
    getProveedores: {
      type: new GraphQLList(ProveedorType),
      description: "Obtiene lista de proveedores",
      resolve: isAuthenticatedResolver.createResolver(
        (parent, args, { db, user, acceso }) => {
          if (acceso.getProveedores && acceso.activo) {
            return db.Proveedor.find();
          } else {
            return null;
          }
        }
      )
    },
    // <-- fin -->

    // Producto
    getProducto: {
      type: ProductoType,
      description: "Obtiene Producto por ID",
      args: { _id: { type: GraphQLID } },
      resolve: isAuthenticatedResolver.createResolver(
        (parent, args, { db, user, acceso }) => {
          if (acceso.getProducto && acceso.activo) {
            return db.Producto.findOne(args);
          } else {
            return null;
          }
        }
      )
    },
    getProductos: {
      type: new GraphQLList(ProductoType),
      description: "Obtiene lista de productos",
      args: { _id: { type: GraphQLID } },
      resolve: isAuthenticatedResolver.createResolver(
        (parent, args, { db, user, acceso }) => {
          if (acceso.getProductos && acceso.activo) {
            return db.Producto.find();
          } else {
            return null;
          }
        }
      )
    },
    getProductosPage: {
      type: productolisType,
      description: "Obtiene lista de productos paginados",
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt }
      },
      resolve: isAuthenticatedResolver.createResolver(
        async (parent, args, { db, user, acceso }) => {
          if (acceso.getProductos && acceso.activo) {
            const prox = await db.Producto.paginate(
              {},
              { page: args.page, limit: args.limit }
            );

            return prox;

            // return db.Producto.find(args);
          } else {
            return null;
          }
        }
      )
    },
    // <-- fin -->

    // Lineas
    getLineas: {
      type: new GraphQLList(LineaType),
      description: "Obtiene Lineas",
      resolve: (parent, args, { db, user, acceso }) => {
        return db.Linea.find();
      }
    },
    // <-- fin -->

    // Categorias
    getCategorias: {
      type: new GraphQLList(CategoriaType),
      description: "Obtiene Categorias",
      resolve: (parent, args, { db, user, acceso }) => {
        return db.Categoria.find();
      }
    }
    // <-- fin -->
  }
});

export default RootQuery;
