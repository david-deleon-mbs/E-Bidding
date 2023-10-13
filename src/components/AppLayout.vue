<!-- This is going to be the layout for all pages cos each pages has the exact same template -->
<script setup>
import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'
</script>

<template>
  <TheHeader />
    <router-view></router-view>
  <TheFooter />
</template>