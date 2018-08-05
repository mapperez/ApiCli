import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt
} from "graphql";
import { GraphQLEmail } from "../../node_modules/graphql-custom-types";
import bcrypt from "bcrypt";
import JsonObject from "graphql-json-object-type";

//Funciones
import auth from "../funciones/auth";
import formatErrors from "../funciones/formatErrors";
import isAuthenticatedResolver from "../funciones/permision";

//Tipos
import ResponseType from "../types/responseType";
import TokenType from "../types/tokenType";

// Emun
import ImagenEnum from "../types/imagenEnum";
import PerfilEnum from "../types/perfilEmun";

const cliAcceso = {
  upUsuario: true,
  delUsuario: false,
  getUsuario: false,
  getUsuarios: false,
  upPerfil: false,
  addAcceso: false,
  upAcceso: false,
  delAcceso: false,
  addProveedor: false,
  upProveedor: false,
  getProveedor: false,
  getProveedores: false,
  getProducto: true,
  getProductos: true,
  addProducto: false,
  upProducto: false,
  getProveedorProductos: true,
  addProveedorProducto: false,
  upProveedorProducto: false,
  addImagen: false,
  upImagen: false,
  addLinea: false,
  addCategoria: false,
  activo: true
};
const usrAcceso = {
  upUsuario: true,
  delUsuario: false,
  getUsuario: false,
  getUsuarios: false,
  upPerfil: false,
  addAcceso: false,
  upAcceso: false,
  delAcceso: false,
  addProveedor: false,
  upProveedor: false,
  getProveedor: false,
  getProveedores: false,
  getProducto: true,
  getProductos: true,
  addProducto: false,
  upProducto: false,
  getProveedorProductos: true,
  addProveedorProducto: false,
  upProveedorProducto: false,
  addImagen: false,
  upImagen: false,
  addLinea: false,
  addCategoria: false,
  activo: true
};
const admAcceso = {
  upUsuario: true,
  delUsuario: true,
  getUsuario: true,
  getUsuarios: true,
  upPerfil: true,
  addAcceso: true,
  upAcceso: true,
  delAcceso: true,
  addProveedor: true,
  upProveedor: true,
  getProveedor: true,
  getProveedores: true,
  getProducto: true,
  getProductos: true,
  addProducto: true,
  upProducto: true,
  getProveedorProductos: true,
  addProveedorProducto: true,
  upProveedorProducto: true,
  addImagen: true,
  upImagen: true,
  addLinea: true,
  addCategoria: true,
  activo: true
};

const Mutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "Operaciones de registros",
  fields: {
    /*
      Mutacion    : Usuario
      Descripción : Operaciones (login,add,up,del) 
    */
    login: {
      type: TokenType,
      description: "Acceso Usuario",
      args: {
        email: { type: GraphQLEmail },
        pwd: { type: GraphQLString }
      },
      resolve: async (parent, args, { db }) => {
        const valuser = await auth.login(args);
        return valuser;
      }
    },
    addUsuario: {
      type: ResponseType,
      description: "Crea un nuevo Usuario",
      args: {
        email: { type: new GraphQLNonNull(GraphQLEmail) },
        nombre: { type: GraphQLString },
        pwd: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args, { db }) => {
        let otherErrors = [];

        try {
          if (args.pwd.length < 8) {
            otherErrors.push({
              path: "password",
              message: "Password debe ser mayor a 8 caracteres"
            });
          }

          // Lanzar otros errores
          if (otherErrors.length > 0) {
            throw otherErrors;
          }

          //Convertir password
          const hashPassword = await bcrypt.hash(args.pwd, 10);
          args.pwd = hashPassword;
          const user = await db.Usuario.create(args);

          return {
            success: true,
            message: `Se ha creado ${user.email}`,
            data: {
              _id: user._id
            },
            errors: []
          };
        } catch (errorx) {
          return {
            success: false,
            message: "Ha ocurrido un error durante la operación",
            errors: formatErrors(errorx, otherErrors)
          };
        }
      }
    },
    upUsuario: {
      type: ResponseType,
      description: "Modifica Usuario",
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: GraphQLString }
      },
      resolve: isAuthenticatedResolver.createResolver(
        async (parent, args, { db }) => {
          let otherErrors = [];
          if (acceso.upUsuario && acceso.activo) {
            try {
              const user = await db.Usuario.findByIdAndUpdate(
                args._id,
                { $set: args },
                { new: true }
              );

              return {
                success: true,
                message: `Usuario actualizado`,
                data: {
                  _id: user._id
                },
                errors: []
              };
            } catch (errorx) {
              return {
                success: false,
                message: "Ha ocurrido un error durante la operación",
                errors: formatErrors(errorx, otherErrors)
              };
            }
          } else {
          }
        }
      )
    },
    delUsuario: {
      type: ResponseType,
      description: "Elimina Usuario",
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: isAuthenticatedResolver.createResolver(
        async (parent, args, { db, user, acceso }) => {
          let otherErrors = [];

          try {
            if (acceso.delUsuario && acceso.activo) {
              const user = await db.Usuario.remove(args);

              return {
                success: true,
                message: `Usuario Eliminado`,
                data: user,
                errors: []
              };
            } else {
              return {
                success: false,
                message: `Error de acceso`,
                data: null,
                errors: [
                  {
                    path: "Usuario",
                    message: "No tiene permisos necesarios"
                  }
                ]
              };
            }
          } catch (errorx) {
            return {
              success: false,
              message: "Ha ocurrido un error durante la operación",
              errors: formatErrors(errorx, otherErrors)
            };
          }
        }
      )
    },

    upPerfil: {
      type: ResponseType,
      description: "Crea perfil de usuario",
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        perfil: { type: PerfilEnum }
      },
      resolve: async (parent, args, { db, user, acceso }) => {
        let otherErrors = [];

        try {
          if (acceso.addProveedor && acceso.activo) {
            const user = await db.Usuario.findByIdAndUpdate(
              args._id,
              { $set: args },
              { new: true }
            );

            return {
              success: true,
              message: `Perfil de usuario actualizado`,
              data: user,
              errors: []
            };
          } else {
            return {
              success: false,
              message: `Error de acceso`,
              data: null,
              errors: [
                {
                  path: "Perfil",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }
        } catch (errorx) {
          return {
            success: false,
            message: "Ha ocurrido un error durante la operación",
            errors: formatErrors(errorx, otherErrors)
          };
        }
      }
    },
    // <--- Fin --->

    /*
      Mutacion    : Acceso
      Descripción : Operaciones (login,add,up,del) 
    */
    addAcceso: {
      type: ResponseType,
      description: "Crea acceso de usuario",
      args: {
        usuarioId: { type: new GraphQLNonNull(GraphQLID) },
        perfil: { type: new GraphQLNonNull(PerfilEnum) }
      },
      resolve: async (parent, args, { db, user, acceso }) => {
        let otherErrors = [];
        let accx = {};

        try {
          if (acceso.addAcceso && acceso.activo) {
            switch (args.perfil) {
              case "Cliente":
                accx = cliAcceso;
                break;
              case "Usuario":
                accx = usrAcceso;
                break;
              case "Administrador":
                accx = admAcceso;
                break;
            }
          
            args.acceso = JSON.stringify(accx);
            const acx = await db.Acceso.create(args);

            return {
              success: true,
              message: `Acceso de usuario creado`,
              data: acx,
              errors: []
            };
         } else {
            return {
              success: false,
              message: `Error de acceso`,
              data: null,
              errors: [
                {
                  path: "Acceso",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }

        } catch (errorx) {
          return {
            success: false,
            message: "Ha ocurrido un error durante la operación",
            errors: formatErrors(errorx, otherErrors)
          };
        }
      }
    },
    upAcceso: {
      type: ResponseType,
      description: "Actualiza acceso de usuario",
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        usuarioId: { type: new GraphQLNonNull(GraphQLID) },
        perfil: { type: new GraphQLNonNull(PerfilEnum) }
      },
      resolve: async (parent, args, { db, user, acceso }) => {
        let otherErrors = [];
        let accx = {};

        try {
          if (acceso.upAcceso && acceso.activo) {
            switch (args.perfil) {
              case "Cliente":
                accx = cliAcceso;
                break;
              case "Usuario":
                accx = usrAcceso;
                break;
              case "Administrador":
                accx = admAcceso;
                break;
            }

            args.acceso = JSON.stringify(accx);

            const acx = await db.Acceso.findByIdAndUpdate(
              args._id,
              { $set: args },
              { new: true }
            );

            return {
              success: true,
              message: `Acceso de usuario creado`,
              data: acx,
              errors: []
            };
          } else {
            return {
              success: false,
              message: `Error de acceso`,
              data: null,
              errors: [
                {
                  path: "Acceso",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }
        } catch (errorx) {
          return {
            success: false,
            message: "Ha ocurrido un error durante la operación",
            errors: formatErrors(errorx, otherErrors)
          };
        }
      }
    },
    delAcceso: {
      type: ResponseType,
      description: "Eliminar acceso de usuario",
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args, { db, user, acceso }) => {
        let otherErrors = [];
        let accx = {};

        try {
          if (acceso.delAcceso && acceso.activo) {
            const acx = await db.Acceso.remove(args);

            return {
              success: true,
              message: `Acceso de usuario eliminado`,
              data: acx,
              errors: []
            };
          } else {
            return {
              success: false,
              message: `Error de acceso`,
              data: null,
              errors: [
                {
                  path: "Acceso",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }
        } catch (errorx) {
          return {
            success: false,
            message: "Ha ocurrido un error durante la operación",
            errors: formatErrors(errorx, otherErrors)
          };
        }
      }
    },
    // <--- Fin --->

    /*
      Mutacion    : Proveedor
      Descripción : Operaciones (add,up,del) 
    */
    addProveedor: {
      type: ResponseType,
      description: "Crea Proveedor",
      args: {
        rut: { type: new GraphQLNonNull(GraphQLString) },
        razon_social: { type: new GraphQLNonNull(GraphQLString) },
        direccion: { type: new GraphQLNonNull(GraphQLString) },
        geolocation: { type: JsonObject },
        comuna: { type: GraphQLString },
        telefono: { type: GraphQLString },
        email: { type: GraphQLEmail },
        calidad: { type: GraphQLInt }
      },
      resolve: isAuthenticatedResolver.createResolver(
        async (parent, args, { db, user, acceso }) => {
          let otherErrors = [];

          if (acceso.addProveedor && acceso.activo) {
            try {
              const provx = await db.Proveedor.create(args);
              return {
                success: true,
                message: `Se ha creado ${provx.razon_social}`,
                data: {
                  _id: provx._id
                },
                errors: []
              };
            } catch (error) {
              return {
                success: false,
                message: "Ha ocurrido un error durante la operación",
                data: null,
                errors: formatErrors(error, otherErrors)
              };
            }
          } else {
            return {
              success: false,
              message: `Error de acceso`,
              data: null,
              errors: [
                {
                  path: "Proveedor",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }
        }
      )
    },
    upProveedor: {
      type: ResponseType,
      description: "Modifica Proveedor",
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        rut: { type: new GraphQLNonNull(GraphQLString) },
        razon_social: { type: new GraphQLNonNull(GraphQLString) },
        direccion: { type: new GraphQLNonNull(GraphQLString) },
        geolocation: { type: JsonObject },
        comuna: { type: GraphQLString },
        telefono: { type: GraphQLString },
        email: { type: GraphQLEmail },
        calidad: { type: GraphQLInt }
      },
      resolve: isAuthenticatedResolver.createResolver(
        async (parent, args, { db, user, acceso }) => {
          let otherErrors = [];

          if (acceso.upProveedor && acceso.activo) {
            try {
              const provx = await db.Proveedor.findByIdAndUpdate(
                args._id,
                { $set: args },
                { new: true }
              );

              return {
                success: true,
                message: `Se ha creado ${provx.razon_social}`,
                data: {
                  _id: provx._id
                },
                errors: []
              };
            } catch (error) {
              return {
                success: false,
                message: "Ha ocurrido un error durante la operación",
                data: null,
                errors: formatErrors(error, otherErrors)
              };
            }
          } else {
            return {
              success: false,
              message: `Error de acceso`,
              data: null,
              errors: [
                {
                  path: "Proveedor",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }
        }
      )
    },
    // <--- fin --->

    /*
      Mutacion    : Producto
      Descripción : Operaciones (add,up,del) 
    */
    addProducto: {
      type: ResponseType,
      description: "Crea un nuevo producto",
      args: {
        codInterno: { type: new GraphQLNonNull(GraphQLInt) },
        lineaId: { type: GraphQLNonNull(GraphQLID) },
        categoriaId: { type: GraphQLNonNull(GraphQLID) },
        marca: { type: new GraphQLNonNull(GraphQLString) },
        modelo: { type: new GraphQLNonNull(GraphQLString) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        medidas: { type: new GraphQLNonNull(GraphQLString) },
        descripcion: { type: new GraphQLNonNull(GraphQLString) },
        activo: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve: isAuthenticatedResolver.createResolver(
        async (parent, args, { db, user, acceso }) => {
          let otherErrors = [];

          if (acceso.addProducto && acceso.activo) {
            try {
              const productox = await db.Producto.create(args);
              return {
                success: true,
                message: `Se ha creado ${productox.nombre}`,
                data: {
                  _id: productox._id
                },
                errors: []
              };
            } catch (error) {
              return {
                success: false,
                message: "Ha ocurrido un error durante la operación",
                errors: formatErrors(error, otherErrors)
              };
            }
          } else {
            return {
              success: false,
              message: `Error de acceso`,
              errors: [
                {
                  path: "Producto",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }
        }
      )
    },
    upProducto: {
      type: ResponseType,
      description: "Modifica Producto",
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        codInterno: { type: new GraphQLNonNull(GraphQLString) },
        lineaId: { type: GraphQLNonNull(GraphQLID) },
        categoriaId: { type: GraphQLNonNull(GraphQLID) },
        marca: { type: new GraphQLNonNull(GraphQLString) },
        modelo: { type: new GraphQLNonNull(GraphQLString) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        descripcion: { type: new GraphQLNonNull(GraphQLString) },
        activo: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve: isAuthenticatedResolver.createResolver(
        async (parent, args, { db, user, acceso }) => {
          let otherErrors = [];

          if (acceso.upProducto && acceso.activo) {
            try {
              const productox = await db.Producto.findByIdAndUpdate(
                args._id,
                { $set: args },
                { new: true }
              );

              return {
                success: true,
                message: `Se ha actualizado ${productox.nombre}`,
                data: {
                  _id: perfilx._id
                },
                errors: []
              };
            } catch (error) {
              return {
                success: false,
                message: "Ha ocurrido un error durante la operación",
                errors: formatErrors(errorx, otherErrors)
              };
            }
          } else {
            return {
              success: false,
              message: `Error de acceso`,
              errors: [
                {
                  path: "Producto",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }
        }
      )
    },
    // <--- Fin --->

    /*
      Mutacion    : Producto Proveedor
      Descripción : Operaciones (add,up,del) 
    */

    addProveedorProducto: {
      type: ResponseType,
      description: "Crea un nuevo producto asociado a proveedor",
      args: {
        productoId: { type: new GraphQLNonNull(GraphQLID) },
        proveedorId: { type: new GraphQLNonNull(GraphQLID) },
        precio: { type: new GraphQLNonNull(GraphQLInt) },
        calidad: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: isAuthenticatedResolver.createResolver(
        async (parent, args, { db, user, acceso }) => {
          let otherErrors = [];

          if (acceso.addProveedorProducto && acceso.activo) {
            try {
              const prox = await db.ProveedorProducto.create(args);

              return {
                success: true,
                message: `Se ha asociado un nuevo producto`,
                data: prox,
                errors: []
              };
            } catch (error) {
              return {
                success: false,
                message: "Ha ocurrido un error durante la operación",
                errors: formatErrors(error, otherErrors)
              };
            }
          } else {
            return {
              success: false,
              message: `Error de acceso`,
              errors: [
                {
                  path: "Proveedor Producto",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }
        }
      )
    },

    // <--- Fin --->

    /*
      Mutacion    : Imagenes Productos
      Descripción : Operaciones (add,up,del) 
    */
    addImagen: {
      type: ResponseType,
      description: "Agrega Imagen a producto",
      args: {
        productoId: { type: new GraphQLNonNull(GraphQLID) },
        photo: { type: new GraphQLNonNull(GraphQLString) },
        tipo: { type: new GraphQLNonNull(ImagenEnum) }
      },
      resolve: isAuthenticatedResolver.createResolver(
        async (parent, args, { db, user, acceso }) => {
          let otherErrors = [];

          if (acceso.addImagen && acceso.activo) {
            try {
              const img = await db.Imagen.create(args);

              return {
                success: true,
                message: `Se ha asociado una nueva imagen`,
                data: img,
                errors: []
              };
            } catch (error) {
              return {
                success: false,
                message: "Ha ocurrido un error durante la operación",
                errors: formatErrors(error, otherErrors)
              };
            }
          } else {
            return {
              success: false,
              message: `Error de acceso`,
              errors: [
                {
                  path: "Imagen Producto",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }
        }
      )
    },
    upImagen: {
      type: ResponseType,
      description: "Actualiza Imagen del Producto",
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        productoId: { type: new GraphQLNonNull(GraphQLID) },
        photo: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: isAuthenticatedResolver.createResolver(
        async (parent, args, { db, user, acceso }) => {
          let otherErrors = [];

          if (acceso.upImagen && acceso.activo) {
            try {
              const img = await db.Imagen.findByIdAndUpdate(
                args._id,
                { $set: args },
                { new: true }
              );

              return {
                success: true,
                message: `Se ha actualizado la imagen`,
                data: img,
                errors: []
              };
            } catch (error) {
              return {
                success: false,
                message: "Ha ocurrido un error durante la operación",
                errors: formatErrors(error, otherErrors)
              };
            }
          } else {
            return {
              success: false,
              message: `Error de acceso`,
              errors: [
                {
                  path: "Imagen Producto",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }
        }
      )
    },

    // <--- Fin --->

    /*
      Mutacion    : Lineas
      Descripción : Operaciones (add,up,del) 
    */

    addLinea: {
      type: ResponseType,
      description: "Agrega Linea",
      args: {
        nombre: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: isAuthenticatedResolver.createResolver(
        async (parent, args, { db, user, acceso }) => {
          let otherErrors = [];
          console.log(acceso)

          if (acceso.addLinea && acceso.activo) {
            try {
              const img = await db.Linea.create(args);

              return {
                success: true,
                message: `Se ha asociado una nueva linea`,
                data: img,
                errors: []
              };
            } catch (error) {
              return {
                success: false,
                message: "Ha ocurrido un error durante la operación",
                errors: formatErrors(error, otherErrors)
              };
            }
          } else {
            return {
              success: false,
              message: `Error de acceso`,
              errors: [
                {
                  path: "Lineas",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }
        }
      )
    },

    // <--- Fin --->

    /*
      Mutacion    : Lineas
      Descripción : Operaciones (add,up,del) 
    */

    addCategoria: {
      type: ResponseType,
      description: "Agrega Categoria",
      args: {
        lineaId: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: isAuthenticatedResolver.createResolver(
        async (parent, args, { db, user, acceso }) => {
          let otherErrors = [];

          if (acceso.addCategoria && acceso.activo) {
            try {
              const img = await db.Categoria.create(args);

              return {
                success: true,
                message: `Se ha asociado una nueva categoria`,
                data: img,
                errors: []
              };
            } catch (error) {
              return {
                success: false,
                message: "Ha ocurrido un error durante la operación",
                errors: formatErrors(error, otherErrors)
              };
            }
          } else {
            return {
              success: false,
              message: `Error de acceso`,
              errors: [
                {
                  path: "Categorias",
                  message: "No tiene permisos necesarios"
                }
              ]
            };
          }
        }
      )
    }

    // <--- Fin --->
  }
});

export default Mutation;
