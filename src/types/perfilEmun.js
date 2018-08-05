import {GraphQLEnumType} from 'graphql'

const PerfilEnum = new GraphQLEnumType({
    name: 'PerfilEnum',
    values: {
      Cliente: { description: 'Perfil para usuarios que realizan compras' },
      Usuario: { description: 'Perfil de usuario del sistema' },
      Administrador: { description: 'Perfil de administrador del sistema' },
    }
  });

  export default PerfilEnum