<template>
  <TheNav v-show="!props.readOnly"></TheNav>
  
  <TitlePage>Quotations</TitlePage>

  <div class="text-center mb-3">Bid # {{ typeof selectedBid == "object" ? selectedBid.rfqNum : JSON.parse(selectedBid).rfqNum }} - {{ typeof selectedBid == "object" ? selectedBid.description : JSON.parse(selectedBid).description }}</div>

  <div class="overflow-x-auto mx-10">
    <div v-if="isLoading" class="flex justify-center my-10">
      <span class="loading loading-spinner text-custom-template"></span>
    </div>
    <table class="table" v-else-if="quotations">
      <thead class="bg-custom-template text-custom-template-text text-center">
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
      <tbody class=" text-custom-template">
        <tr class="hover text-center" v-for="quotation in quotations" :key="quotation.Attributes.ITEMNUM.content">
          <th style="border-right-width: 1px;">
            <span>{{ quotation.Attributes.ITEMNUM?.content }}</span>
          </th>
          <td class="text-left" style="border-right-width: 1px;">{{ quotation.Attributes.DESCRIPTION?.content }}</td>
          <td style="border-right-width: 1px;">        
            <template v-if="props.readOnly">
              <div v-if="quotation.Attributes.C1VENDORCOMPLY.content != true">
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
                :checked="quotation.Attributes.C1VENDORCOMPLY.content" 
                @click="handleSubmit(
                quotation.Attributes.QUOTATIONLINEID.content, 
                quotation.Attributes.C1VENDORCOMPLY.content = !quotation.Attributes.C1VENDORCOMPLY.content,
                quotation.Attributes.MEMO,
                quotation.Attributes.UNITCOST.content,
                )" 
                class="checkbox" 
              />
            </template>
          </td>
          <td style="border-right-width: 1px;">{{ quotation.Attributes.ORDERQTY?.content }}</td>
          <td style="border-right-width: 1px;">{{ quotation.Attributes.ORDERUNIT?.content }}</td>
          <td style="border-right-width: 1px;">
            <select id="countries" class="p-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>PHP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
              <option value="JPY">JPY</option>
              <option value="CAD">CAD</option>
              <option value="CHF">CHF</option>
              <option value="HKD">HKD</option>
              <option value="SGD">SGD</option>
              <option value="BND">BND</option>
              <option value="THB">THB</option>
              <option value="IDR">IDR</option>
              <option value="SAR">SAR</option>
              <option value="MYR">MYR</option>
              <option value="NZD">NZD</option>
              <option value="BHD">BHD</option>
              <option value="KRW">KRW</option>
            </select>
          </td>
          <td style="border-right-width: 1px;">
            <input 
              v-show="!props.readOnly"
              type="number" 
              placeholder="0.00" 
              class="input input-bordered w-full"
              v-model="quotation.Attributes.UNITCOST.content"
              @focusout="handleSubmit(
                quotation.Attributes.QUOTATIONLINEID.content, 
                quotation.Attributes.C1VENDORCOMPLY.content,
                quotation.Attributes.MEMO,
                quotation.Attributes.UNITCOST.content,
              )"
            />
            <p v-show="props.readOnly">{{ quotation.Attributes.UNITCOST.content }}</p>
          </td>
          <td style="border-right-width: 1px;">
            {{ quotation.Attributes.ORDERQTY?.content * quotation.Attributes.UNITCOST.content }}
          </td>
          <td style="border-right-width: 1px;">
            <input 
              v-show="!props.readOnly"
              type="text" 
              placeholder="Enter Remarks" 
              class="input input-sm input-bordered w-full" 
              v-model="quotation.Attributes.MEMO"
              @focusout="handleSubmit(
                quotation.Attributes.QUOTATIONLINEID.content, 
                quotation.Attributes.C1VENDORCOMPLY.content,
                quotation.Attributes.MEMO,
                quotation.Attributes.UNITCOST.content,
              )"
            />
            <p v-show="props.readOnly">{{ quotation.Attributes.MEMO }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-else>
      <thead class="text-black border border-t-2 border-b-2">
        <tr>
          <th class="text-center tracking-widest" style="border-right-width: 1px;">No Quotations Found</th>
        </tr>
      </thead>
    </table>

    <div v-show="!props.readOnly" class="text-center mt-5">
      <button class="btn btn-sm bg-custom-template text-custom-template-text px-8 text-transform: capitalize !important; hover:bg-custom-template" @click="toActiveBids">Back</button>
      <button class="btn btn-sm bg-custom-template text-custom-template-text px-8 text-transform: capitalize !important; hover:bg-custom-template" @click="toTechnicalCompliance">Next</button>
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

const payload = ref({
  quotationLineID: 0,
  totalPrice: 0,
  hasCompiled: 0,
  memo: 0,
})

const selectedBid = computed(() => store.state.selectedBid)

onMounted(() => {
  store.dispatch('getQuotations', typeof selectedBid.value == "object" ? selectedBid.value.rfqNum : JSON.parse(selectedBid.value).rfqNum);
});

const isLoading = computed(() => store.getters.loadingStatus)

const quotations = computed(() => store.state.quotations)

const handleSubmit = (quotationLineID, hasCompiled, memo, unitCost) => {
    payload.value.quotationLineID = quotationLineID;
    payload.value.totalPrice = unitCost;
    payload.value.hasCompiled = hasCompiled;
    payload.value.memo = memo;
    console.log('payload', payload)
    store.dispatch('quotationLine', payload)
}

const toActiveBids = () => {
  router.push({
    name: 'active-bids'
  });
}

const toTechnicalCompliance = () => {
  router.push({
    name: 'technical-compliance'
  });
}
</script>

<style scoped>

</style>
