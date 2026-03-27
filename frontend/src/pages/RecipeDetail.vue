<template>
  <div class="detail">
    <RouterLink to="/" class="detail__back">← Voltar para receitas</RouterLink>

    <!-- Skeleton enquanto carrega -->
    <div v-if="loading" class="detail__skeleton" aria-busy="true">
      <div class="skeleton skeleton--hero"></div>
      <div class="detail__skeleton-content">
        <div class="skeleton skeleton--heading"></div>
        <div class="skeleton skeleton--line"></div>
        <div class="skeleton skeleton--line skeleton--line-short"></div>
      </div>
    </div>

    <!-- Erro -->
    <p v-else-if="error" class="feedback feedback--error">{{ error }}</p>

    <!-- Receita não encontrada (sem erro de rede) -->
    <p v-else-if="!recipe" class="feedback feedback--not-found">
      Receita não encontrada.
    </p>

    <!-- Conteúdo da receita -->
    <article v-else class="detail__article">
      <img
        :src="recipe.imageUrl"
        :alt="recipe.title"
        class="detail__image"
      />

      <h1 class="detail__title">{{ recipe.title }}</h1>
      <p class="detail__desc">{{ recipe.description }}</p>

      <section
        v-for="(group, gi) in recipe.ingredientGroups"
        :key="gi"
        class="detail__section"
      >
        <h2 class="detail__section-title">
          {{ group.title ? `Ingredientes – ${group.title}` : 'Ingredientes' }}
        </h2>
        <ul class="detail__ingredients">
          <li v-for="(ingredient, i) in group.items" :key="i">
            {{ ingredient }}
          </li>
        </ul>
      </section>

      <section class="detail__section">
        <h2 class="detail__section-title">Modo de preparo</h2>
        <div class="detail__instructions">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="detail__step"
          >
            <span class="detail__step-number">{{ i + 1 }}</span>
            <p class="detail__step-text">{{ step }}</p>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipes } from '../composables/useRecipes.js'

const route = useRoute()
const { recipe, loading, error, fetchRecipeBySlug } = useRecipes()

const steps = computed(() =>
  recipe.value?.instructions
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean) ?? []
)

watch(recipe, (val) => {
  if (val) document.title = `${val.title} — Baking Bread`
})

onMounted(() => {
  fetchRecipeBySlug(route.params.slug)
})
</script>
