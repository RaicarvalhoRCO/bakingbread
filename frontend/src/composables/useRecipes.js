import { ref } from 'vue'
import { getRecipes, getRecipeBySlug } from '../services/api.js'

/**
 * Composable centralizado para carregar receitas.
 * Cada chamada a useRecipes() cria um estado reativo isolado,
 * ideal para uso por página/componente independente.
 */
export function useRecipes() {
  const recipes = ref([])
  const recipe = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchRecipes() {
    loading.value = true
    error.value = null
    try {
      recipes.value = await getRecipes()
    } catch (e) {
      error.value = e.message ?? 'Erro ao carregar receitas.'
    } finally {
      loading.value = false
    }
  }

  async function fetchRecipeBySlug(slug) {
    loading.value = true
    error.value = null
    recipe.value = null
    try {
      recipe.value = await getRecipeBySlug(slug)
    } catch (e) {
      error.value = e.message ?? 'Erro ao carregar a receita.'
    } finally {
      loading.value = false
    }
  }

  return {
    recipes,
    recipe,
    loading,
    error,
    fetchRecipes,
    fetchRecipeBySlug,
  }
}
