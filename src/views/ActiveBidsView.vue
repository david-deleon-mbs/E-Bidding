<template>
  <TheNav></TheNav>
  
  <TitlePage>Active Bids</TitlePage>

  <div class="overflow-x-auto mx-10">
    <div v-if="isLoading" class="flex justify-center my-10">
      <span class="loading loading-spinner text-primary"></span>
    </div>
    <table class="table" v-else-if="rfqs">
      <thead class="bg-primary text-white">
        <tr>
          <th style="border-right-width: 1px;">Bid #</th>
          <th style="border-right-width: 1px;">Description</th>
          <th style="border-right-width: 1px;">Close Date</th>
          <th style="border-right-width: 1px;">Total Bid Amount</th>
          <th style="border-right-width: 1px;">Bid Rank #</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover" v-for="rfq in rfqs" :key="rfq.Attributes.RFQID">
          <!-- for getting specific rfqNum -->
          <!-- https://bpi-dev.mbs.com.ph/maxrest/rest/mbo/RFQVENDOR?_lid=maxadmin&_lpwd=P@ssw0rd&rfqnum=~eq~1019 -->
          <th style="border-right-width: 1px;">
            <span class="cursor-pointer" @click="toQuotations(rfq.Attributes.RFQNUM.content)">{{ rfq.Attributes.RFQNUM.content }}</span>
          </th>
          <td style="border-right-width: 1px;">{{ rfq.Attributes.DESCRIPTION.content }}</td>
          <td style="border-right-width: 1px;">{{ rfq.Attributes.CLOSEONDATE.content }}</td>
          <td style="border-right-width: 1px;">{{ rfq.Attributes.RFQNUM.content }}</td>
          <td style="border-right-width: 1px;">{{ rfq.Attributes.RFQNUM.content }}</td>
          <td style="border-right-width: 1px;">
            <div class="text-center">
              <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary" onclick="my_modal_1.showModal()">Decline Bid</button>
            </div>  
          </td>
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
      <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary" @click="dashboard">Back</button>
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
  console.log('Component is mounted getRfq');
  // store.dispatch('getActiveBids');
  store.dispatch('getRfq');
  // console.log('hehe', store.getters.getRfq)
});

const isLoading = computed(() => store.getters.loadingStatus)

const rfqs = computed(() => store.state.rfqs);

console.log('rfqs', store.state.rfqs);

const toQuotations = (RfqNum) => {
  router.push({
    name: 'quotations',
    params: {
      id: RfqNum
    }
  });
}

const dashboard = () => {
  router.push({
    name: 'home'
  });
}
</script>

<style scoped>

</style>
