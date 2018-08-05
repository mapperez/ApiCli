import mongoose from "mongoose";
import validate from "mongoose-validator";

const proveedorProductoSchema = new mongoose.Schema({

  productoId: {type: String},
  proveedorId: {type: String},
  precio: {type: Number},
  calidad: {type: Number},
  createdAt: {
    type: String,
    default: new Date()
  },
  updatedAt: {
    type: String,
    default: new Date()
  }
});

const proveedorProductoModel = mongoose.model("ProveedorProducto", proveedorProductoSchema);

export default proveedorProductoModel;