import jwt from "jsonwebtoken";
import Usuario from "../models/usuario";
import Acceso from "../models/acceso";

import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const auth = {
  checkHeaders: async (req, res, next) => {
    const token = req.headers["x-token"];

    // Reemplazar por db

    if (token) {
      try {
        const { user } = await jwt.verify(token, process.env.SECRET);
        //Buscar accesos
        try {
          const myacceso = await Acceso.findOne({usuarioId: user._id});
          req.user = user;
          req.acceso =JSON.parse(myacceso.acceso);
        } catch (error) {
          console.log(error);
        }

       
      } catch (error) {
        switch (error.message) {
          case "invalid token":
            req.user = null;
            req.acceso = {};

            break;
          case "jwt expired":
            const newToken = await auth.checkToken(token);

            try {
              const myacceso = await Acceso.findOne({usuarioId: newToken.user});

              req.user = newToken.user;
              req.acceso =JSON.parse(myacceso.acceso);

            } catch (error) {
              console.log(error)
            }

            if (newToken.token) {
              // Refrescamos el token el el explorados
              res.set("Access-Control-Expose-Headers", "x-token");
              res.set("x-token", newToken.token);
            }

            break;
        }
      }
    }

    next();
  },
  checkToken: async token => {
    let idUser = null;

    try {
      const { user } = await jwt.decode(token);
      idUser = user;
    } catch (err) {
      return {};
    }

    //Con usuario existente
    const userx = await Usuario.findOne({ _id: idUser });
    const newToken = await auth.getToken(userx);

    return {
      user: userx._id,
      token: newToken
    };
  },
  getToken: async ({ _id }) => {
    const newToken = jwt.sign({ user: _id }, process.env.SECRET, {
      expiresIn: "10s"
    });

    return newToken;
  },
  login: async args => {
    const user = await Usuario.findOne({ email: args.email });
    if (user) {
      //Comparar Pwd
      const ValidPwd = await bcrypt.compare(args.pwd, user.pwd);

      if (ValidPwd) {
        //Generar token
        const tkn = await auth.getToken(user);
        return {
          success: true,
          message: "Bienvenido su token de acceso",
          token: tkn,
          data: {
            email: user.email,
            perfil: user.perfil,
            nombre: user.nombre
          }
        };
      } else {
        return {
          success: false,
          message: "Contraseña no valida",
          token: "",
          data: {}
        };
      }
    } else {
      return {
        success: false,
        message: "Email no existe",
        token: "",
        data: {}
      };
    }
  }
};

export default auth;
