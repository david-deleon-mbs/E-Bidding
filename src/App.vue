<script setup>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <TheHeader />

    <main>
      <router-view></router-view>
    </main>

    <TheFooter />
  </div>
</template>

<style scoped>

</style>
