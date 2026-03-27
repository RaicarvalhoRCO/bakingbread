/**
 * Camada de abstração para o CMS headless — integração Sanity.
 *
 * Variáveis de ambiente necessárias (arquivo .env):
 *   VITE_SANITY_PROJECT_ID=seu-project-id
 *   VITE_SANITY_DATASET=production          (opcional, padrão: production)
 *
 * ─── Para trocar de CMS ───────────────────────────────────────────────────────
 *   Substitua apenas as implementações de `getRecipes` e `getRecipeBySlug`.
 *   A interface (nomes e assinaturas) deve permanecer igual.
 *
 * ─── Formato esperado de cada receita ───────────────────────────────────────
 * {
 *   title:            string
 *   slug:             string
 *   description:      string
 *   ingredientGroups: Array<{ title?: string, items: string[] }>
 *   instructions:     string   (parágrafos separados por \n)
 *   imageUrl:         string
 * }
 */

// ─── Sanity client ───────────────────────────────────────────────────────────
import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset:   import.meta.env.VITE_SANITY_DATASET ?? 'production',
  useCdn:    import.meta.env.PROD, // CDN apenas em produção; dev usa api.sanity.io direto
  apiVersion: '2024-01-01',
})

export async function getRecipes() {
  return sanity.fetch(`
    *[_type == "recipe"] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      description,
      "imageUrl": image.asset->url
    }
  `)
}

export async function getRecipeBySlug(slug) {
  const recipe = await sanity.fetch(
    `*[_type == "recipe" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      description,
      ingredientGroups[] {
        title,
        items
      },
      instructions,
      "imageUrl": image.asset->url
    }`,
    { slug }
  )
  if (!recipe) throw new Error(`Receita "${slug}" não encontrada.`)
  return recipe
}
// ─────────────────────────────────────────────────────────────────────────────

