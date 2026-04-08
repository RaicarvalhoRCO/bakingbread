<template>
  <section class="home">
    <div class="home__hero">
      <img
        src="../assets/hero.png"
        alt="Baking Bread"
        class="home__hero-img"
      />
    </div>

    <!-- Barra de filtros -->
    <div class="filters">
      <div class="filters__search">
        <span class="filters__search-icon">🔍</span>
        <input
          v-model="search"
          type="text"
          placeholder="Buscar receita…"
          class="filters__input"
        />
        <button v-if="search" class="filters__clear" @click="search = ''" aria-label="Limpar busca">✕</button>
      </div>

      <div class="filters__categories">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filters__cat-btn"
          :class="{ 'filters__cat-btn--active': activeCategory === cat }"
          @click="toggleCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Resultados -->
    <div v-if="loading" class="recipe-grid">
      <SkeletonCard v-for="n in 6" :key="n" />
    </div>

    <p v-else-if="error" class="feedback feedback--error">{{ error }}</p>

    <template v-else>
      <p v-if="filtered.length === 0" class="feedback feedback--not-found">
        Nenhuma receita encontrada para os filtros aplicados.
      </p>
      <div v-else class="recipe-grid">
        <RecipeCard
          v-for="item in filtered"
          :key="item.slug"
          :recipe="item"
        />
      </div>
    </template>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import { useRecipes } from '../composables/useRecipes.js'

const { recipes, loading, error, fetchRecipes } = useRecipes()

const CATEGORIES = ['Todos', 'Salgados', 'doces', 'Drinks']
const categories = CATEGORIES
const search = ref('')
const activeCategory = ref('Todos')

function toggleCategory(cat) {
  activeCategory.value = cat
}

const filtered = computed(() => {
  let result = recipes.value

  if (activeCategory.value !== 'Todos') {
    result = result.filter((r) => r.category === activeCategory.value)
  }

  const term = search.value.trim().toLowerCase()
  if (term) {
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(term) ||
        r.description?.toLowerCase().includes(term)
    )
  }

  return result
})

onMounted(() => {
  document.title = 'Baking Bread — Receitas'
  fetchRecipes()
})
</script>
