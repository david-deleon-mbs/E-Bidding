<template>
  <TheNav></TheNav>
  
  <TitlePage>Terms And Conditions</TitlePage>

  <div class="text-center mb-3">Bid # {{ $route.params.id }} - (RFQ Description)</div>

  <div class="overflow-x-auto mx-10">
    <div v-if="isLoading" class="flex justify-center my-10">
      <span class="loading loading-spinner text-primary"></span>
    </div>
    <table class="table" v-else-if="rfqs">
      <thead class="bg-primary text-white">
        <tr>
          <th style="border-right-width: 1px;">Sequence</th>
          <th style="border-right-width: 1px;">Description</th>
          <th style="border-right-width: 1px;">Comply?</th>
          <th style="border-right-width: 1px;">Remarks</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover" v-for="rfq in rfqs" :key="rfq.Attributes.RFQID">
          <!-- for getting specific rfqNum -->
          <!-- https://bpi-dev.mbs.com.ph/maxrest/rest/mbo/RFQVENDOR?_lid=maxadmin&_lpwd=P@ssw0rd&rfqnum=~eq~1019 -->
          <th style="border-right-width: 1px;">
            <span class="cursor-pointer" @click="toBidding">{{ rfq.Attributes.RFQNUM.content }}</span>
          </th>
          <td style="border-right-width: 1px;">{{ rfq.Attributes.DESCRIPTION.content }}</td>
          <td style="border-right-width: 1px;">{{ rfq.Attributes.DESCRIPTION.content }}</td>
          <td style="border-right-width: 1px;">{{ rfq.Attributes.CLOSEONDATE.content }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Open the modal using ID.showModal() method -->
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <p class="pt-4">Please select reason for declining:</p>
        <div class="flex justify-center">
          <select class="select select-bordered select-xs w-full max-w-xs flex my-5">
            <option disabled selected>Current workload of projects</option>
            <option>Current workload of projects</option>
            <option>Current workload of projects</option>
            <option>Current workload of projects</option>
          </select>
        </div>
        <div class="flex justify-center">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-sm mr-5 text-transform: capitalize !important;">Decline Bid</button>
            <button class="btn btn-sm text-transform: capitalize !important;">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>

    <div class="text-center mt-5">
      <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary" @click="toTechnicalCompliance">Back</button>
      <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary" @click="toFinalReview">Next</button>
    </div>
  </div>
</template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";
import { onMounted, computed } from 'vue';

import TitlePage from "../components/TitlePage.vue";
import TheNav from "../components/TheNav.vue";

const router = useRouter();

onMounted(() => {
  store.dispatch('getRfq');

  // getRFQ with the given RFQ. https://bpi-dev.mbs.com.ph/maxrest/rest/mbo/RFQVENDOR?_lid=maxadmin&_lpwd=P@ssw0rd&rfqnum=~eq~1019 // no RFQ description here.
});

const isLoading = computed(() => store.getters.loadingStatus)

const rfqs = computed(() => store.state.rfqs);

console.log('rfqs', store.state.rfqs);

const toBidding = () => {
  router.push({
    name: 'bidding'
  });
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

<style scoped>

</style>
