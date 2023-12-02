<template>
  <nav class="my-2">
    <div class="flex justify-center">
      <a class="cursor-pointer" @click="dashboard"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="text-custom-template" viewBox="0 0 24 24" width="24" height="24"><path d="M13.768,1.147a2.5,2.5,0,0,0-3.536,0L0,11.38V21a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.38ZM21,21H16V17.818A3.818,3.818,0,0,0,12.182,14h-.364A3.818,3.818,0,0,0,8,17.818V21H3V12.622l9-9,9,9Z"/></svg></a>
      <a class="cursor-pointer mx-3" @click="changePassword"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="24" height="24" fill="currentColor" class="text-custom-template"><g><path d="M405.333,179.712v-30.379C405.333,66.859,338.475,0,256,0S106.667,66.859,106.667,149.333v30.379   c-38.826,16.945-63.944,55.259-64,97.621v128C42.737,464.214,90.452,511.93,149.333,512h213.333   c58.881-0.07,106.596-47.786,106.667-106.667v-128C469.278,234.971,444.159,196.657,405.333,179.712z M277.333,362.667   c0,11.782-9.551,21.333-21.333,21.333c-11.782,0-21.333-9.551-21.333-21.333V320c0-11.782,9.551-21.333,21.333-21.333   c11.782,0,21.333,9.551,21.333,21.333V362.667z M362.667,170.667H149.333v-21.333c0-58.91,47.756-106.667,106.667-106.667   s106.667,47.756,106.667,106.667V170.667z"/></g></svg></a> 
      <a class="cursor-pointer" @click="logout"><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="text-custom-template"><path d="M23.117,9.879l-4.95-4.95L16.046,7.05,19.5,10.5H6.617v3H19.5l-3.45,3.45,2.121,2.121,4.95-4.95A3,3,0,0,0,23.117,9.879Z"/><path d="M9.994,20.5a.5.5,0,0,1-.5.5H3.506a.5.5,0,0,1-.5-.5V3.531a.5.5,0,0,1,.5-.5H9.494a.5.5,0,0,1,.5.5V8.345h3V3.531a3.505,3.505,0,0,0-3.5-3.5H3.506a3.505,3.505,0,0,0-3.5,3.5V20.5a3.5,3.5,0,0,0,3.5,3.5H9.494a3.5,3.5,0,0,0,3.5-3.5V15.683h-3Z"/></svg></a>
    </div>
  </nav>
</template>

<script setup>
import store from "../store";

import { useRouter } from "vue-router";

const router = useRouter();

const dashboard = () => {
  router.push({
    name: 'home'
  });
}

const changePassword = () => {
  router.push({
    name: 'change-password'
  });
}

const logout = () => {
  store.dispatch('logout');

  router.push({
    name: 'login'
  });
}
</script>