import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate'

const productoSchema = new mongoose.Schema({

  codInterno:{
    type: Number,
    unique: true
  },
  marca: {
    type: String,
    default: "HA"
  },
  categoriaId: {
    type: String,
    required: true
  },
  lineaId: {
    type: String,
    required: true
  },
  modelo: String,
  nombre: String,
  descripcion: String,
  medidas: String,
  activo: Boolean,
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
});
productoSchema.plugin(mongoosePaginate)

const productoModel = mongoose.model("Producto", productoSchema);

export default productoModel;
