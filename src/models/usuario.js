import mongoose from "mongoose";
import validate from "mongoose-validator";


const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    validate: validate({
      validator: "isEmail",
      message: "El campo debe ser un email valido"
    })
  },
  pwd: {
    type: String,
    required: [true, "La contraseña es requerida"]
  },
  perfil: {
    type: String,
    default: "Cliente"
  },
  activo: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: String,
    default: new Date()
  },
  updatedAt: {
    type: String,
    default: new Date()
  }
});
const usuarioModel = mongoose.model("Usuario", usuarioSchema);

export default usuarioModel;
