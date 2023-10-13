<template>
  <div v-if="!showTermsAndConditionsDialog" class="my-8">
    <TheNav></TheNav>
  
    <TitlePage>Final Review</TitlePage>
    
    <TitlePage :customStyle="'!border-t-0'">Quotations</TitlePage>

    <div class="text-center mb-3">Bid # {{ $route.params.id }} - (RFQ Description)</div>

    <div class="overflow-x-auto mx-10">
      <div v-if="isLoading" class="flex justify-center my-10">
        <span class="loading loading-spinner text-primary"></span>
      </div>
      <table class="table" v-else-if="rfqs">
        <thead class="bg-primary text-white">
          <tr>
            <th style="border-right-width: 1px;">Item</th>
            <th style="border-right-width: 1px;">Description</th>
            <th style="border-right-width: 1px;">Compliant to Specifications?</th>
            <th style="border-right-width: 1px;">Quantity</th>
            <th style="border-right-width: 1px;">Order Unit</th>
            <th style="border-right-width: 1px;">Currency</th>
            <th style="border-right-width: 1px;">Unit Price (VAT Inclusive)</th>
            <th style="border-right-width: 1px;">Total Price (VAT Inclusive)</th>
            <th style="border-right-width: 1px;">Qualifications</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rfq in rfqs" :key="rfq.Attributes.RFQID">
            <!-- for getting specific rfqNum -->
            <!-- https://bpi-dev.mbs.com.ph/maxrest/rest/mbo/RFQVENDOR?_lid=maxadmin&_lpwd=P@ssw0rd&rfqnum=~eq~1019 -->
            <th style="border-right-width: 1px;">{{ rfq.Attributes.RFQNUM.content }}</th>
            <td style="border-right-width: 1px;">{{ rfq.Attributes.DESCRIPTION.content }}</td>
            <td style="border-right-width: 1px;">{{ rfq.Attributes.CLOSEONDATE.content }}</td>
            <td style="border-right-width: 1px;">{{ rfq.Attributes.RFQNUM.content }}</td>
            <td style="border-right-width: 1px;">{{ rfq.Attributes.RFQNUM.content }}</td>
            <td style="border-right-width: 1px;">{{ rfq.Attributes.RFQNUM.content }}</td>
            <td style="border-right-width: 1px;">{{ rfq.Attributes.RFQNUM.content }}</td>
            <td style="border-right-width: 1px;">{{ rfq.Attributes.RFQNUM.content }}</td>
            <td style="border-right-width: 1px;">{{ rfq.Attributes.RFQNUM.content }}</td>
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
    </div>

    <TitlePage>Technical Compliance</TitlePage>

    <div class="overflow-x-auto mx-10">
      <div v-if="isLoading" class="flex justify-center my-10">
        <span class="loading loading-spinner text-primary"></span>
      </div>
      <table class="table" v-else-if="rfqs">
        <thead class="bg-primary text-white">
          <tr>
            <th style="border-right-width: 1px;">Questions / Queries</th>
            <th style="border-right-width: 1px;">Comply?</th>
            <th style="border-right-width: 1px;">Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rfq in rfqs" :key="rfq.Attributes.RFQID">
            <!-- for getting specific rfqNum -->
            <!-- https://bpi-dev.mbs.com.ph/maxrest/rest/mbo/RFQVENDOR?_lid=maxadmin&_lpwd=P@ssw0rd&rfqnum=~eq~1019 -->
            <th style="border-right-width: 1px;">{{ rfq.Attributes.RFQNUM.content }}</th>
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
    </div>

    <TitlePage>Terms And Conditions</TitlePage>

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
          <tr v-for="rfq in rfqs" :key="rfq.Attributes.RFQID">
            <!-- for getting specific rfqNum -->
            <!-- https://bpi-dev.mbs.com.ph/maxrest/rest/mbo/RFQVENDOR?_lid=maxadmin&_lpwd=P@ssw0rd&rfqnum=~eq~1019 -->
            <th style="border-right-width: 1px;">{{ rfq.Attributes.RFQNUM.content }}</th>
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
        <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary" @click="toTermsAndConditions">Back</button>
        <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary" @click="showTermsAndConditionsDialog = true">Next</button>
      </div>
    </div>
  </div>

  <div v-else-if="!isBidSubmitted" class="card card-side h-96 bg-base-100">
    <div class="mx-auto my-auto">
      <div class="flex">
        <input type="checkbox" :checked="hasAgreeTermsAndCondition" @click="hasAgreeTermsAndCondition = !hasAgreeTermsAndCondition" class="checkbox" />
        <h3 class="font-bold text-lg text-center px-5 -mt-[1px]">I have read and agreed to all terms and conditions.</h3>
      </div>
      <div class="text-center mt-5">
        <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary" @click="showTermsAndConditionsDialog = false">Back</button>
        <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary" :disabled="!hasAgreeTermsAndCondition" @click="submitBid">Submit</button>
      </div>
    </div>
  </div>

  <div v-show="isBidSubmitted" class="card card-side h-96 bg-base-100">
    <div class="card-body my-auto">
      <h3 class="font-bold text-lg text-center">Your bid was successfully submitted!</h3>
      <p class="my-4 text-center text-primary" @click="dashboard">
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

const router = useRouter();

onMounted(() => {
  store.dispatch('getRfq');

  // getRFQ with the given RFQ. https://bpi-dev.mbs.com.ph/maxrest/rest/mbo/RFQVENDOR?_lid=maxadmin&_lpwd=P@ssw0rd&rfqnum=~eq~1019 // no RFQ description here.
});

const showTermsAndConditionsDialog = ref(false);

const hasAgreeTermsAndCondition = ref(false);

const isBidSubmitted = computed(() => store.getters.isBidSubmitted)

const isLoading = computed(() => store.getters.loadingStatus)

const rfqs = computed(() => store.state.rfqs);

console.log('rfqs', store.state.rfqs);

const submitBid = () => {
  store.dispatch('submitBid');
  // store.getters.isBidSubmitted; // use this for the v-show dialog
}

const dashboard = () => {
  router.push({
    name: 'home'
  });
  store.state.isBidSubmitted = false;
}

const toBidding = () => {
  router.push({
    name: 'bidding'
  });
}

const toTermsAndConditions = () => {
  router.push({
    name: 'terms-and-conditions'
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
