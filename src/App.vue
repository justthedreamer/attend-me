<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/student">Student</RouterLink>
        <RouterLink to="/lecturer">Lecturer</RouterLink>
        <RouterLink to="/error">Error</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView/>
</template>

<style scoped>
</style>
