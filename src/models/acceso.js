import mongoose from "mongoose";
import validate from "mongoose-validator";

const accesoSchema = new mongoose.Schema({
  usuarioId: { 
      type: String,
      unique: true 
    },
  perfil: { type: String },
  acceso: { type: String },
  createdAt: {
    type: String,
    default: new Date()
  },
  updatedAt: {
    type: String,
    default: new Date()
  }
});
const accesoModel = mongoose.model("Acceso", accesoSchema);

export default accesoModel;
