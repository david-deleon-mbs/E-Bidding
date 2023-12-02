<template>
  <div v-if="!showTermsAndConditionsDialog" class="my-8">
    <TheNav></TheNav>
  
    <TitlePage :customStyle="'!border-b-0'">Final Review</TitlePage>
    
    <QuotationsView :readOnly="true" />

    <TechnicalComplianceView :readOnly="true" />

    <TermsAndConditionsView :readOnly="true" />

    <div class="text-center mt-5">
      <button class="btn btn-sm bg-custom-template text-custom-template-text px-8 text-transform: capitalize !important; hover:bg-custom-template" @click="toTermsAndConditions">Back</button>
      <button class="btn btn-sm bg-custom-template text-custom-template-text px-8 text-transform: capitalize !important; hover:bg-custom-template" @click="showTermsAndConditionsDialog = true">Next</button>
    </div>
  </div>

  <div v-else-if="!isBidSubmitted" class="card card-side h-96 bg-base-100">
    <div class="mx-auto my-auto">
      <div class="flex">
        <input type="checkbox" :checked="hasAgreeTermsAndCondition" @click="hasAgreeTermsAndCondition = !hasAgreeTermsAndCondition" class="checkbox" />
        <h3 class="font-bold text-lg text-center px-5 -mt-[1px]">I have read and agreed to all terms and conditions.</h3>
      </div>
      <div class="text-center mt-5">
        <button class="btn btn-sm bg-custom-template text-custom-template-text px-8 text-transform: capitalize !important; hover:bg-custom-template" @click="showTermsAndConditionsDialog = false">Back</button>
        <button class="btn btn-sm bg-custom-template text-custom-template-text px-8 text-transform: capitalize !important; hover:bg-custom-template" :disabled="!hasAgreeTermsAndCondition" @click="submitBid">Submit</button>
      </div>
    </div>
  </div>

  <div v-show="isBidSubmitted" class="card card-side h-96 bg-base-100">
    <div class="card-body my-auto">
      <h3 class="font-bold text-lg text-center">Your bid was successfully submitted!</h3>
      <p class="my-4 text-center text-custom-template" @click="dashboard">
        <span class="cursor-pointer">Go back to Dashboard</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";
import { onMounted, computed, ref } from 'vue';

import TitlePage from "../components/TitlePage.vue";
import TheNav from "../components/TheNav.vue";
import TermsAndConditionsView from "./TermsAndConditionsView.vue";
import TechnicalComplianceView from "./TechnicalComplianceView.vue";
import QuotationsView from "./QuotationsView.vue";

const router = useRouter();

onMounted(() => {
  store.dispatch('getRfq');
});

const showTermsAndConditionsDialog = ref(false);

const hasAgreeTermsAndCondition = ref(false);

const isBidSubmitted = computed(() => store.getters.isBidSubmitted)

const submitBid = () => {
  store.dispatch('submitBid');
}

const dashboard = () => {
  router.push({
    name: 'home'
  });
  store.state.isBidSubmitted = false;
}

const toTermsAndConditions = () => {
  router.push({
    name: 'terms-and-conditions'
  });
}
</script>

<style scoped>

</style>
