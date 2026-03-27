export default {
  name: 'recipe',
  title: 'Receita',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text'
    },
    {
      name: 'ingredients',
      title: 'Ingredientes',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'instructions',
      title: 'Modo de preparo',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}