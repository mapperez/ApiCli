import { GraphQLObjectType, GraphQLString , GraphQLID} from "graphql";
import { GraphQLDateTime } from "../../node_modules/graphql-custom-types";
import ImagenEnum from "./imagenEnum";



const ImagenType = new GraphQLObjectType({
  name: "Imagen",
  description: 'Tipo ImagenType',
  fields: () => ({
    _id: {type: GraphQLID},
    productoId: {type: GraphQLID},
    photo: { type: GraphQLString },
    tipo: {type: ImagenEnum},
    createdAt: {type: GraphQLDateTime},
    updatedAt: {type: GraphQLDateTime}
  })
});




export default ImagenType