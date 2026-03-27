<template>
  <section class="home">
    <div class="home__hero">
      <h1 class="home__heading">Receitas que <em>aquecem</em> a alma</h1>
      <p class="home__subheading">Receitas caseiras com técnicas e amor</p>
    </div>

    <div v-if="loading" class="recipe-grid">
      <SkeletonCard v-for="n in 6" :key="n" />
    </div>

    <p v-else-if="error" class="feedback feedback--error">{{ error }}</p>

    <div v-else class="recipe-grid">
      <RecipeCard
        v-for="item in recipes"
        :key="item.slug"
        :recipe="item"
      />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import { useRecipes } from '../composables/useRecipes.js'

const { recipes, loading, error, fetchRecipes } = useRecipes()

onMounted(() => {
  document.title = 'Baking Bread — Receitas'
  fetchRecipes()
})
</script>
