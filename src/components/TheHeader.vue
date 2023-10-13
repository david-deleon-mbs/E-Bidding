<template>
  <!-- <div class="sticky top-0 mx-auto">
    <div class="bg-primary p-5">
      <h1 class="uppercase text-center text-base-100 text-lg">Bank of The Philippine Island</h1>
    </div>
  </div> -->
  <header>
      <div class="bg-primary p-5">
        <h1 class="uppercase text-center text-base-100 text-lg">{{ appName }}</h1>
      </div>
    </header>
</template>

<script setup>
const appName = import.meta.env.VITE_APP_NAME;
</script>