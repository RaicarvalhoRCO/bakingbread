import { IngredientGroupInput } from './IngredientGroupInput'
import { InstructionGroupInput } from './InstructionGroupInput'

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
      name: 'ingredientGroups',
      title: 'Ingredientes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ingredientGroup',
          title: 'Seção de ingredientes',
          options: { modal: { type: 'inline' } },
          components: { input: IngredientGroupInput },
          fields: [
            {
              name: 'title',
              title: 'Título da seção (ex: Massa, Recheio)',
              type: 'string',
              description: 'Deixe em branco para usar apenas "Ingredientes"'
            },
            {
              name: 'items',
              title: 'Ingredientes',
              type: 'array',
              of: [{ type: 'string' }]
            }
          ],
          preview: {
            select: { title: 'title', items: 'items' },
            prepare({ title, items }) {
              const count = items?.length ?? 0
              return {
                title: title || 'Ingredientes',
                subtitle: `${count} ingrediente${count !== 1 ? 's' : ''}`
              }
            }
          }
        }
      ]
    },
    {
      name: 'instructionGroups',
      title: 'Modo de preparo',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'instructionGroup',
          title: 'Seção do modo de preparo',
          options: { modal: { type: 'inline' } },
          components: { input: InstructionGroupInput },
          fields: [
            {
              name: 'title',
              title: 'Título da seção (ex: Massa, Recheio, Montagem)',
              type: 'string',
              description: 'Deixe em branco para usar apenas "Modo de preparo"'
            },
            {
              name: 'steps',
              title: 'Passos',
              type: 'array',
              of: [{ type: 'string' }]
            }
          ],
          preview: {
            select: { title: 'title', steps: 'steps' },
            prepare({ title, steps }) {
              const count = steps?.length ?? 0
              return {
                title: title || 'Modo de preparo',
                subtitle: `${count} passo${count !== 1 ? 's' : ''}`
              }
            }
          }
        }
      ]
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Salgados',   value: 'Salgados' },
          { title: 'Sobremesas', value: 'Sobremesas' },
          { title: 'Drinks',     value: 'Drinks' },
        ],
        layout: 'radio',
      },
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