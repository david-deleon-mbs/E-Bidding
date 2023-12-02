<template>
  <header>
      <div class="bg-custom-template p-5">
        <h1 class="uppercase text-center text-custom-template-text text-lg">{{ appName }}</h1>
      </div>
    </header>
</template>

<script setup>
const appName = import.meta.env.VITE_APP_NAME;
</script>