import mongoose from "mongoose";
import validate from "mongoose-validator";
import CategoriaType from "../types/categoriaType";

const lineaSchema = new mongoose.Schema({ 
  nombre: { 
      type: String,
      unique: true
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
const lineaModel = mongoose.model("Linea", lineaSchema);

export default lineaModel;
