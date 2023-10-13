<template>
  <TheNav></TheNav>
  
  <TitlePage>Dashboard</TitlePage>

  <div v-if="isLoading" class="flex justify-center my-10">
    <span class="loading loading-spinner text-primary"></span>
  </div>
  <div v-else-if="userCompanies" class="flex justify-center -mt-4">
    <div class="card w-96 bg-base-100 shadow-xl m-5">
      <h2 class="card-title bg-primary text-white p-3 flex justify-center">
        <IconCheckCircle />
        <div>Active Bids</div>
      </h2>
      <div class="my-auto text-center">
        <h1 class="text-7xl text-primary cursor-pointer -mt-10" @click="toActiveBids">1</h1>
      </div>
    </div>
    <div class="card w-96 bg-base-100 shadow-xl m-5">
      <h2 class="card-title bg-primary text-white p-3 flex justify-center">
        <IconInfo />
        <div>General Information</div>
      </h2>
      <div class="card-body">
        <h1 class="uppercase font-bold text-center mt-0">{{ userCompanies.name || 'N/A' }}</h1>
        <p>Address: {{ userCompanyContact.address1 || 'N/A' }}</p>
        <p>Zip Code: {{ userCompanyContact.address4 || 'N/A' }}</p>
        <p>Phone: {{ userCompanyContact.phone || 'N/A' }}</p>
        <p>Fax: {{ userCompanyContact.fax || 'N/A' }}</p>
      </div>
    </div>
    <div class="card w-96 bg-base-100 shadow-xl m-5">
      <h2 class="card-title bg-primary text-white p-3 flex justify-center">
        <IconUser />
        <div>Primary Contact Person</div>
      </h2>
      <div class="card-body">
        <p>Contact: {{ userCompanyContact.contact || 'N/A' }}</p>
        <p>Position: {{ userCompanyContact.position || 'N/A' }}</p>
        <p>Phone: {{ userCompanyContact.voicephone || 'N/A' }}</p>
        <p>Fax: {{ userCompanyContact.faxphone || 'N/A' }}</p>
        <p>Email: {{ userCompanyContact.email || 'N/A' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import IconInfo from '../components/icons/IconInfo.vue';
import IconUser from '../components/icons/IconUser.vue';
import IconCheckCircle from '../components/icons/IconCheckCircle.vue';

import { onMounted, computed } from 'vue';
import store from "../store";
import TitlePage from "../components/TitlePage.vue";
import TheNav from "../components/TheNav.vue";

onMounted(() => {
  console.log('Component is mounted');
  store.dispatch('getCompanyContact');
  store.dispatch('getCompanies');
});

const isLoading = computed(() => store.getters.loadingStatus)

// we can put this into getters like getDashboardDetails
const userCompanies = computed(() => store.state.companies);
const userCompanyContact = computed(() => store.state.companyContact);

const router = useRouter();

const toActiveBids = () => {
  router.push({
    name: 'active-bids'
  });
}
</script>

<style scoped>

</style>
