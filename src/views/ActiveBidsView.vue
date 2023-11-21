<template>
  <TheNav></TheNav>
  
  <TitlePage>Active Bids</TitlePage>

  <div class="overflow-x-auto mx-10">
    <div v-if="isLoading" class="flex justify-center my-10">
      <span class="loading loading-spinner text-primary"></span>
    </div>
    <table class="table" v-else-if="activeBids">
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
        <tr class="hover" v-for="bid in activeBids" :key="bid.Attributes.RFQNUM">
          <th style="border-right-width: 1px;">
            <span class="cursor-pointer" @click="toQuotations(bid)">{{ bid.Attributes.RFQNUM.content }}</span>
          </th>
          <td style="border-right-width: 1px;">{{ bid.RelatedMbos.RFQ[0].Attributes.DESCRIPTION.content }}</td>
          <td style="border-right-width: 1px;">{{ bid.RelatedMbos.RFQ[0].Attributes.CLOSEONDATE.content }}</td>
          <td style="border-right-width: 1px;">{{ bid.Attributes.C1RANKAMOUNT?.content }}</td>
          <td style="border-right-width: 1px;">{{ bid.Attributes.C1RANK?.content }}</td>
          <td style="border-right-width: 1px;">
            <div class="text-center">
              <button class="btn btn-sm bg-primary text-white px-8 text-transform: capitalize !important; hover:bg-primary" @click="declineBideModal(bid.Attributes.RFQVENDORID.content)">Decline Bid</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Open the modal using ID.showModal() method -->
    <dialog id="decline_bid_modal" class="modal" :open="showDeclineBideModal">
      <div class="modal-box">
        <p class="pt-4">Please select reason for declining:</p>
        <div class="flex justify-center">
          <select v-model="payload.declineBidReason" class="select select-bordered select-xs w-full max-w-xs flex my-5">
            <!-- <option disabled selected>Current workload of projects</option>
            <option>Current workload of projects</option> -->
            <option
              v-for="(declineBidOption, key) in declineBidOptions"
              :value="declineBidOption.Attributes.DESCRIPTION.content"
              :key="key"
            >
              {{ declineBidOption.Attributes.DESCRIPTION.content }}
            </option>
          </select>
        </div>
        <div class="flex justify-center">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-sm mr-5 text-transform: capitalize !important;" @click="declineBid">Decline Bid</button>
            <button class="btn btn-sm text-transform: capitalize !important;" @click="showDeclineBideModal = false">Cancel</button>
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
import { onMounted, computed, ref } from 'vue';

import TitlePage from "../components/TitlePage.vue";
import TheNav from "../components/TheNav.vue";

const router = useRouter();

onMounted(() => {
  console.log('Component is mounted getRfq');
  store.dispatch('getDeclineBidOptions');
  store.dispatch('getActiveBids');
});

const isLoading = computed(() => store.getters.loadingStatus)

const activeBids = computed(() => store.state.activeBids);

const declineBidOptions = computed(() => store.state.declineBidOptions);

const payload = ref({
  RFQNumber: 0,
  declineBidReason: 'Current workload of projects',
})

const showDeclineBideModal = ref(false);

const declineBideModal = (data) => {
  showDeclineBideModal.value = true;

  payload.value.RFQNumber = data;
}

const declineBid = () => {
  store.dispatch('declineBid', payload)
}

console.log('getActiveBids', store.state.activeBids);

const toQuotations = (bid) => {
  console.log('bid', bid)
  console.log('bid.Attributes.RFQNUM.content', bid.Attributes.RFQNUM.content)
  store.commit('setSelectedBid', bid)
  router.push({
    name: 'quotations',
    params: {
      id: bid.Attributes.RFQNUM.content
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
