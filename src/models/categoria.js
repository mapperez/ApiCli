import mongoose from "mongoose";
import validate from "mongoose-validator";


const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    unique: true
  },
  lineaId: { type: String },
  createdAt: {
    type: String,
    default: new Date()
  },
  updatedAt: {
    type: String,
    default: new Date()
  }
});
const categoriaModel = mongoose.model("Categoria", categoriaSchema);

export default categoriaModel;
