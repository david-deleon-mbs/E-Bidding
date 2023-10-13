<template>
  <!-- put this css class on this div element. -->
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <!-- <h1 class="text-5xl font-bold">Hello there</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        <button class="btn btn-primary">Get Started</button> -->
        <form @submit="login">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">User ID:</span>
            </label>
            <input 
              type="text" 
              placeholder="Type here" 
              class="input input-bordered w-full max-w-xs" 
              v-model="user.userID"
              />
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Password:</span>
            </label>
            <input 
              type="password" 
              placeholder="Type here" 
              class="input input-bordered w-full max-w-xs" 
              v-model="user.password"
              />
          </div>

          <div>
            <button type="submit" class="flex mt-5 w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import store from "../store";

const router = useRouter();

const user = {
  userID: '',
  password: '',
}

function login(e) {
  e.preventDefault();

  store.dispatch('login', user)
    .then((response) => {
      if (!response.COMPANIESMboSet.COMPANIES.length) {
        router.push({
          name: 'login'
        });
      } else {
        store.dispatch('getCompanyContact', user)
        router.push({
          name: 'home'
        });
      }
    })
    .catch((error) => {
      // errorMsg.value = error.response.data.error
      console.log('error', error);
    })
}
</script>