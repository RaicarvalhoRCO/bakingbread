<template>
  <div class="app-wrapper">
    <header class="site-header">
      <RouterLink to="/" class="logo">🍞 Baking Bread</RouterLink>
    </header>

    <main class="site-main">
      <RouterView />
    </main>

    <footer class="site-footer">
      <p>© 2026 Baking Bread — Feito com amor e farinha</p>
    </footer>
  </div>
</template>

<script setup>
// App shell — sem lógica aqui, apenas estrutura de layout
</script>
