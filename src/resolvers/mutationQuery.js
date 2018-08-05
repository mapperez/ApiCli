import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from "graphql";
import { GraphQLEmail } from "../../node_modules/graphql-custom-types";
import bcrypt from "bcrypt";
import formatErrors from "../funciones/formatErrors";
import ResponseType from "../types/responseType";




const Mutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "Operaciones de registros",
  fields: {
    /*
      Mutacion    : Usuario
      Descripción : Operaciones (login,add,up,del) 
    */
    AddUsuario: {
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
    UpdUsuario: {
      type: ResponseType,
      description: "Actualiza Usuario",
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        nombre: { type: GraphQLString }
      },
      resolve: async (parent, args, { db }) => {
        let otherErrors = [];

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

      }
    }
    // <--- Fin --->


  }
});

export default Mutation;
