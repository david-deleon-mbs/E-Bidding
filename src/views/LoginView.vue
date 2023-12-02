<template>
  <TitlePage :customStyle="'border-none'">
    <h1 class="font-semibold text-3xl">{{ appName }}</h1>
    <h1 class="font-semibold text-3xl mb-10 mt-4">E-Bidding</h1>
  </TitlePage>

  <form @submit="login" class="max-w-xs mx-auto">
    <div class="form-control w-full">
      <label class="label mx-auto">
        <span class="label-text">User ID:</span>
      </label>
      <input 
        type="text" 
        placeholder="Username" 
        class="input input-bordered w-full" 
        v-model="user.userID"
        />
    </div>
    <div class="form-control w-full">
      <label class="label mx-auto">
        <span class="label-text">Password:</span>
      </label>
      <input 
        type="password" 
        placeholder="Password" 
        class="input input-bordered w-full" 
        v-model="user.password"
        />
    </div>

    <p v-show="errorMessage" class="mt-4 text-center text-custom-template text-sm">{{ errorMessage }}</p>

    <div>
      <button type="submit" class="flex mt-5 w-full justify-center rounded-md bg-custom-template px-3 py-1.5 text-sm font-semibold leading-6 text-custom-template-text shadow-sm hover:bg-custom-template focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-template">Login</button>
    </div>
  </form>
</template>


<script setup>
import { computed, ref } from 'vue';
import { useRouter } from "vue-router";
import store from "../store";

import TitlePage from '../components/TitlePage.vue';

const router = useRouter();

const appName = import.meta.env.VITE_APP_NAME;

const user = ref({
  userID: '',
  password: '',
})

const errorMessage = computed(() => store.state.errorMessage)

function login(e) {
  e.preventDefault();

  store.dispatch('login', user)
    .then((response) => {
      if (!response.COMPANIESMboSet.COMPANIES.length) {
        router.push({
          name: 'login'
        });
      } else {
        router.push({
          name: 'home'
        });
      }
    })
    .catch((error) => {
      console.log('error', error);
    })
}
</script>
