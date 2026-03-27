<template>
  <RouterLink :to="`/recipe/${recipe.slug}`" class="recipe-card">
    <div class="recipe-card__image-wrapper">
      <img
        :src="recipe.imageUrl"
        :alt="recipe.title"
        class="recipe-card__image"
        loading="lazy"
      />
    </div>
    <div class="recipe-card__body">
      <h2 class="recipe-card__title">{{ recipe.title }}</h2>
      <p class="recipe-card__desc">{{ recipe.description }}</p>
      <span class="recipe-card__cta">Ver receita →</span>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  recipe: {
    type: Object,
    required: true,
  },
})
</script>
