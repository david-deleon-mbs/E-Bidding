<template>
  <TheNav v-show="!props.readOnly"></TheNav>
  
  <TitlePage>Terms And Conditions</TitlePage>

  <div v-show="!props.readOnly" class="text-center mb-3">Bid # {{ typeof selectedBid == "object" ? selectedBid.rfqNum : JSON.parse(selectedBid).rfqNum }} - {{ typeof selectedBid == "object" ? selectedBid.description : JSON.parse(selectedBid).description }}</div>

  <div class="overflow-x-auto mx-10">
    <div v-if="isLoading" class="flex justify-center my-10">
      <span class="loading loading-spinner text-primary"></span>
    </div>
    <table class="table" v-else-if="termsAndConditions">
      <thead class="bg-primary text-white">
        <tr>
          <th style="border-right-width: 1px;">Sequence</th>
          <th style="border-right-width: 1px;">Description</th>
          <th style="border-right-width: 1px;">Comply?</th>
          <th style="border-right-width: 1px;">Remarks</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover" v-for="termsAndCondition in termsAndConditions" :key="termsAndCondition.Attributes.RFQVENDORTERMID.content">
          <th style="border-right-width: 1px;">
            <span>{{ termsAndCondition.Attributes.SEQNUM.content }}</span>
          </th>
          <td style="border-right-width: 1px;">{{ termsAndCondition.Attributes.DESCRIPTION.content }}</td>
          <td class="text-center" style="border-right-width: 1px;">
            <template v-if="props.readOnly">
              <div v-if="termsAndCondition.Attributes.C1VENDORCOMPLY.content != true">
                <input 
                  :disabled="props.readOnly"
                  type="checkbox" 
                  value=""
                  class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div v-else>
                <input 
                  :disabled="props.readOnly"
                  type="checkbox" 
                  :checked="true" 
                  class="checkbox !cursor-default !opacity-100" 
                />
              </div>
            </template>
            <template v-else>
              <input 
                type="checkbox" 
                :checked="termsAndCondition.Attributes.C1VENDORCOMPLY.content" 
                @click="handleSubmit(
                  termsAndCondition.Attributes.RFQVENDORTERMID.content,
                  termsAndCondition.Attributes.C1VENDORCOMPLY.content = !termsAndCondition.Attributes.C1VENDORCOMPLY.content,
                  termsAndCondition.Attributes.C1VENDORREMARKS,
                )" 
                class="checkbox" 
              />
            </template>
          </td>
          <td style="border-right-width: 1px;">
            <input 
              v-show="!props.readOnly"
              type="text" 
              placeholder="Enter Remarks" 
              class="input input-sm input-bordered w-full" 
              v-model="termsAndCondition.Attributes.C1VENDORREMARKS"
              @focusout="handleSubmit(
                termsAndCondition.Attributes.RFQVENDORTERMID.content,
                termsAndCondition.Attributes.C1VENDORCOMPLY.content,
                termsAndCondition.Attributes.C1VENDORREMARKS,
              )"
            />
            <p v-show="props.readOnly">{{ termsAndCondition.Attributes.C1VENDORREMARKS }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-else>
      <thead class="text-black border border-t-2 border-b-2">
        <tr>
          <th class="text-center tracking-widest" style="border-right-width: 1px;">No Terms & Conditions Found</th>
        </tr>
      </thead>
    </table>

    <div v-show="!props.readOnly" class="text-center mt-5">
      <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary" @click="toTechnicalCompliance">Back</button>
      <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary" @click="toFinalReview">Next</button>
    </div>
  </div>
</template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";
import { onMounted, computed, ref } from 'vue';

import TitlePage from "../components/TitlePage.vue";
import TheNav from "../components/TheNav.vue";

const props = defineProps(['readOnly']);

const router = useRouter();

const selectedBid = computed(() => store.state.selectedBid)

onMounted(() => {
  store.dispatch('getTermsAndCondition', typeof selectedBid.value == "object" ? selectedBid.value.rfqNum : JSON.parse(selectedBid.value).rfqNum);
});

const isLoading = computed(() => store.getters.loadingStatus)

const termsAndConditions = computed(() => store.state.termsAndConditions);

console.log('termsAndConditions', termsAndConditions);

const payload = ref({
  vendorTermId: 0,
  hasCompiled: 0,
  remarks: '',
})

const handleSubmit = (vendorTermId, hasCompiled, remarks) => {
  payload.value.vendorTermId = vendorTermId
  payload.value.hasCompiled = hasCompiled
  payload.value.remarks = remarks

  store.dispatch('termsAndCondition', payload)
}

const toTechnicalCompliance = () => {
  router.push({
    name: 'technical-compliance'
  });
}

const toFinalReview = () => {
  router.push({
    name: 'final-review'
  });
}
</script>
