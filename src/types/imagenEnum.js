import {GraphQLEnumType} from 'graphql'

const ImagenEnum = new GraphQLEnumType({
    name: 'ImagenEnum',
    values: {
      Principal: { description: 'Imagen 200x200 para visualizacion en vistas principales' },
      Miniatura: { description: 'Imagen 60x60 para visualizacion en grillas' },
      Catalogo: { description: 'Imagen de 200x200 para catalogos' },
    }
  });

  export default ImagenEnum