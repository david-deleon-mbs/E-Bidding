<template>
  <div v-if="!isSuccess">
    <TheNav></TheNav>
    
    <TitlePage>Change Password</TitlePage>

    <form @submit="changePassword" class="max-w-xs mx-auto">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">New Password:</span>
        </label>
        <input 
          type="text" 
          class="input input-bordered w-full" 
          v-model="user.userID"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Confirm New Password:</span>
        </label>
        <input 
          type="password" 
          class="input input-bordered w-full" 
          v-model="user.password"
        />
      </div>

      <div class="flex justify-center mt-5">
        <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary" @click="dashboard">Back</button>
        <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary">Submit</button>
      </div>
    </form>
  </div>

  <div v-else class="card card-side h-96 bg-base-100 shadow-xl">
    <div class="card-body my-auto">
      <h3 class="font-bold text-lg text-center">Password successfully changed!</h3>
      <p class="my-4 text-center text-primary" @click="dashboard">
        <span class="cursor-pointer">Go back to Dashboard</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import store from "../store";
import { onMounted, ref } from 'vue';
import TitlePage from "../components/TitlePage.vue";
import TheNav from "../components/TheNav.vue";

onMounted(() => {
  console.log('Component is mounted getRfq');
  // store.dispatch('getActiveBids');
  store.dispatch('getRfq');
  // console.log('hehe', store.getters.getRfq)
});

const isSuccess = ref(false);

const user = ref({
  userID: '',
  password: '',
})

const router = useRouter();

const dashboard = () => {
  router.push({
    name: 'home'
  });
}

const changePassword = (e) => {
  e.preventDefault();
  isSuccess.value = true;
}
</script>

<style scoped>

</style>
