import mongoose from "mongoose";


const imagenSchema = new mongoose.Schema({
  productoId: String,
  photo: String,
  tipo: Object,
  createdAt: {
    type: String,
    default: new Date()
  },
  updatedAt: {
    type: String,
    default: new Date()
  }
});

const imagenModel = mongoose.model("Imagen", imagenSchema);

export default imagenModel;
