<template>
  <div class="!-mt-[100px]">
    <TheNav></TheNav>
  
    <TitlePage>Dashboard</TitlePage>

    <div v-if="isLoading" class="flex justify-center my-10">
      <span class="loading loading-spinner text-custom-template"></span>
    </div>
    <div v-else-if="userCompanies" class="flex justify-center -mt-4">
      <div class="card w-96 shadow-xl m-5">
        <h2 class="card-title bg-custom-template text-white p-3 flex justify-center">
          <IconCheckCircle class="text-custom-template-text" />
          <div class="text-custom-template-text">Active Bids</div>
        </h2>
        <div class="my-auto text-center">
          <h1 class="text-7xl text-custom-template cursor-pointer -mt-10" @click="toActiveBids">{{ userActiveBids?.length || 0 }}</h1>
        </div>
      </div>
      <div class="card w-96 shadow-xl m-5">
        <h2 class="card-title bg-custom-template text-white p-3 flex justify-center">
          <IconInfo class="text-custom-template-text" />
          <div class="text-custom-template-text">General Information</div>
        </h2>
        <div class="card-body">
          <h1 class="uppercase font-bold text-center mt-0">{{ userCompanies?.name || 'N/A' }}</h1>
          <p>Address: {{ userCompanies?.address1 || '' }} {{ userCompanies?.address2 || '' }} {{ userCompanies?.address3 || '' }}</p>
          <p>Zip Code: {{ userCompanies?.address4 || 'N/A' }}</p>
          <p>Phone: {{ userCompanies?.phone || 'N/A' }}</p>
          <p>Fax: {{ userCompanies?.fax || 'N/A' }}</p>
        </div>
      </div>
      <div class="card w-96 shadow-xl m-5">
        <h2 class="card-title bg-custom-template text-white p-3 flex justify-center">
          <IconUser class="text-custom-template-text" />
          <div class="text-custom-template-text">Primary Contact Person</div>
        </h2>
        <div class="card-body">
          <p>Contact: {{ userCompanyContact?.contact || 'N/A' }}</p>
          <p>Position: {{ userCompanyContact?.position || 'N/A' }}</p>
          <p>Phone: {{ userCompanyContact?.voicephone || 'N/A' }}</p>
          <p>Fax: {{ userCompanyContact?.faxphone || 'N/A' }}</p>
          <p>Email: {{ userCompanyContact?.email || 'N/A' }}</p>
        </div>
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
  store.dispatch('getCompanyContact');
  store.dispatch('getCompanies');
  store.dispatch('getActiveBids');
});

const isLoading = computed(() => store.getters.loadingStatus)

const userCompanies = computed(() => store.state.companies);
const userCompanyContact = computed(() => store.state.companyContact);
const userActiveBids = computed(() => store.state.activeBids);

console.log('userCompanyContact 1', userCompanyContact)

const router = useRouter();

const toActiveBids = () => {
  router.push({
    name: 'active-bids'
  });
}
</script>
