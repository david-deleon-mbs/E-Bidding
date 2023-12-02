<template>
  <footer class="text-center p-5 bg-custom-template text-custom-template-text rounded">
    <div class="text-custom-template-text text-sm">
      <p>{{ appName }} © 2018, All rights reserved.</p>
      <p>Powered by: Maximo Business Solution Inc.</p>
    </div>
  </footer>
</template>

<script setup>
const appName = import.meta.env.VITE_APP_NAME;
</script>