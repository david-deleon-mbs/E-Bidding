<template>
  <div :class="`text-center border-y-[1.5px] border-warning max-w-7xl mx-auto my-4 ${props.customStyle}`">
    <h1 class="uppercase font-bold text-2xl my-2">
      <slot></slot>
    </h1>
  </div>
</template>

<script setup>
const props = defineProps(['customStyle']);
</script>