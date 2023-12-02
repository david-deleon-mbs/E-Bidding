<template>
  <div v-if="!isSuccess">
    <TheNav></TheNav>
    
    <TitlePage>Change Password</TitlePage>

    <p v-show="errorMessage" class="text-center text-custom-template text-sm">{{ errorMessage }}</p>

    <div v-if="isLoading" class="flex justify-center my-10">
      <span class="loading loading-spinner text-custom-template"></span>
    </div>
    <form v-else @submit="changePassword" class="max-w-xs mx-auto">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">New Password:</span>
        </label>
        <input 
          type="password" 
          class="input input-bordered w-full" 
          v-model="password"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Confirm New Password:</span>
        </label>
        <input 
          type="password" 
          class="input input-bordered w-full" 
          v-model="confirmPassword"
        />
      </div>

      <div class="flex justify-center mt-5">
        <button class="btn btn-sm bg-custom-template text-custom-template-text px-8 text-transform: capitalize !important; hover:bg-custom-template" @click="dashboard">Back</button>
        <button class="btn btn-sm bg-custom-template text-custom-template-text px-8 text-transform: capitalize !important; hover:bg-custom-template" :disabled="isSubmitButtonDisabled">Submit</button>
      </div>
    </form>
  </div>

  <div v-else class="card card-side h-96 bg-base-100 shadow-xl">
    <div class="card-body my-auto">
      <h3 class="font-bold text-lg text-center">Password successfully changed!</h3>
      <p class="my-4 text-center text-custom-template" @click="dashboard">
        <span class="cursor-pointer">Go back to Dashboard</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import store from "../store";
import { ref, watch, computed } from 'vue';
import TitlePage from "../components/TitlePage.vue";
import TheNav from "../components/TheNav.vue";

const isSuccess = ref(false);

const isLoading = computed(() => store.getters.loadingStatus)

const password = ref('')
const confirmPassword = ref('')

const isSubmitButtonDisabled = ref(true)

const errorMessage = ref('')

const router = useRouter();

const dashboard = () => {
  router.push({
    name: 'home'
  });
}

watch(password, async (newPassword) => {
  if (password.value === '' && confirmPassword.value === '') {
    isSubmitButtonDisabled.value = true;
    errorMessage.value = ''
  } else if (confirmPassword.value === newPassword) {
    isSubmitButtonDisabled.value = false;
    errorMessage.value = ''
  } else if (password.value !== '' && confirmPassword.value === '') {
    isSubmitButtonDisabled.value = true;
    errorMessage.value = ''
  } else {
    errorMessage.value = 'Passwords do not match.'
    isSubmitButtonDisabled.value = true;
  }
})

watch(confirmPassword, async (newConfirmPassword) => {
  if (password.value === '' && confirmPassword.value === '') {
    isSubmitButtonDisabled.value = true;
    errorMessage.value = ''
  } else if (password.value === newConfirmPassword) {
    isSubmitButtonDisabled.value = false;
    errorMessage.value = ''
  } else if (confirmPassword.value !== '' && password.value === '') {
    isSubmitButtonDisabled.value = true;
    errorMessage.value = ''
  }  else {
    errorMessage.value = 'Passwords do not match.'
    isSubmitButtonDisabled.value = true;
  }
})

const changePassword = (e) => {
  e.preventDefault();

  store.dispatch('changePassword', password.value)
    .then(() => {
      if (isLoading.value === false) return isSuccess.value = true
    })
}
</script>
