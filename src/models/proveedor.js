import mongoose from "mongoose";
import validate from "mongoose-validator";

const proveedorSchema = new mongoose.Schema({
  rut: {
    type: String,
    unique: true
  },
  razon_social: String,
  comuna: String,
  direccion: String,
  telefono: String,
  calidad: Number,
  email: {
    type: String,
    unique: true,
    validate: validate({
      validator: "isEmail",
      message: "El campo debe ser un email valido"
    })
  },
  geolocation: String,
  createdAt: {
    type: String,
    default: new Date()
  },
  updatedAt: {
    type: String,
    default: new Date()
  }
});

const proveedorModel = mongoose.model("Proveedor", proveedorSchema);

export default proveedorModel;
