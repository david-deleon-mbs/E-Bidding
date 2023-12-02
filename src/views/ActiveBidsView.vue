<template>
  <TheNav></TheNav>
  
  <TitlePage>Active Bids</TitlePage>

  <div class="overflow-x-auto mx-10">
    <div v-if="isLoading" class="flex justify-center my-10">
      <span class="loading loading-spinner text-custom-template"></span>
    </div>
    <table class="table" v-else-if="activeBids">
      <thead class="bg-custom-template text-custom-template-text">
        <tr>
          <th style="border-right-width: 1px;">Bid #</th>
          <th style="border-right-width: 1px;">Description</th>
          <th style="border-right-width: 1px;">Close Date</th>
          <th style="border-right-width: 1px;">Total Bid Amount</th>
          <th style="border-right-width: 1px;">Bid Rank #</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="text-custom-template">
        <tr class="hover" v-for="bid in activeBids" :key="bid.Attributes.RFQNUM">
          <th style="border-right-width: 1px;">
            <span class="cursor-pointer" @click="toQuotations(bid)">{{ bid.Attributes.RFQNUM.content }}</span>
          </th>
          <td style="border-right-width: 1px;">{{ bid.RelatedMbos.RFQ[0].Attributes.DESCRIPTION.content }}</td>
          <td style="border-right-width: 1px;">{{ formatDate(bid.RelatedMbos.RFQ[0].Attributes.CLOSEONDATE.content) }}</td>
          <td style="border-right-width: 1px;">{{ bid.Attributes.C1RANKAMOUNT?.content }}</td>
          <td style="border-right-width: 1px;">{{ bid.Attributes.C1RANK?.content }}</td>
          <td style="border-right-width: 1px;">
            <div class="text-center">
              <button class="btn btn-sm bg-custom-template text-custom-template-text px-8 text-transform: capitalize !important; hover:bg-custom-template" @click="declineBideModal(bid.Attributes.RFQVENDORID.content)">Decline Bid</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-else>
      <thead class="text-black border border-t-2 border-b-2">
        <tr>
          <th class="text-center tracking-widest" style="border-right-width: 1px;">No Active Bids Found</th>
        </tr>
      </thead>
    </table>

    <dialog id="decline_bid_modal" class="modal" :open="showDeclineBideModal">
      <div class="modal-box">
        <p class="pt-4">Please select reason for declining:</p>
        <div class="flex justify-center">
          <select v-model="payload.declineBidReason" class="select select-bordered select-xs w-full max-w-xs flex my-5">
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
            <button class="btn btn-sm mr-5 text-transform: capitalize !important;" @click="declineBid">Decline Bid</button>
            <button class="btn btn-sm text-transform: capitalize !important;" @click="showDeclineBideModal = false">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>

    <div class="text-center mt-5">
      <button class="btn btn-sm bg-custom-template text-custom-template-text px-8 text-transform: capitalize !important; hover:bg-custom-template" @click="dashboard">Back</button>
    </div>
  </div>
</template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";
import { onMounted, computed, ref } from 'vue';

import TitlePage from "../components/TitlePage.vue";
import TheNav from "../components/TheNav.vue";
import moment from 'moment'

const router = useRouter();

onMounted(() => {
  store.dispatch('getDeclineBidOptions');
  store.dispatch('getActiveBids');
});

const formatDate = (value) => {
  if (value) {
    return moment(value).format('MMMM D, YYYY')
  }
  
  return value
}

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

const toQuotations = (bid) => {
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
