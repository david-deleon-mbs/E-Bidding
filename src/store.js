import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: {
      ID: localStorage.getItem('vendorID') || null,
      companyID: localStorage.getItem('companyID') || null,
      C1EBIDPASS: localStorage.getItem('vendorC1EBIDPASS') || null,
      token: localStorage.getItem('vendor') || false
    },
    companyContact: {},
    companies: {},
    rfqs: {},
    activeBids: {},
    quotations: [],
    technicalCompliances: [],
    termsAndConditions: [],
    updatedQuotations: [],
    declineBidOptions: [],
    selectedBid: localStorage.getItem('selectedBid') || {},
    bidding: [],
    loadingStatus: false,
    isBidSubmitted: false,
  },
  mutations: {
    setUser(state, data) {
      state.user.token = true;
      state.user.ID = data.COMPANIESMboSet.COMPANIES[0].Attributes.COMPANY.content;
      state.user.companyID = data.COMPANIESMboSet.COMPANIES[0].Attributes.COMPANIESID.content;
      state.user.C1EBIDPASS = data.COMPANIESMboSet.COMPANIES[0].Attributes.C1EBIDPASS.content;
      localStorage.setItem('vendor', true);
      localStorage.setItem('vendorID', data.COMPANIESMboSet.COMPANIES[0].Attributes.COMPANY.content);
      localStorage.setItem('companyID', data.COMPANIESMboSet.COMPANIES[0].Attributes.COMPANIESID.content);
      localStorage.setItem('vendorC1EBIDPASS', data.COMPANIESMboSet.COMPANIES[0].Attributes.C1EBIDPASS.content);
    },
    setCompanyContact(state, data) {
      state.companyContact.company = data.COMPCONTACTMboSet.COMPCONTACT[0].Attributes.COMPANY.content;
      state.companyContact.contact = data.COMPCONTACTMboSet.COMPCONTACT[0].Attributes.CONTACT.content;
      state.companyContact.email = data.COMPCONTACTMboSet.COMPCONTACT[0].Attributes.EMAIL.content;
    },
    setCompanies(state, data) {
      console.log('data', data)
      state.companies.name = data.COMPANIESMboSet.COMPANIES[0].Attributes.NAME.content;
    },
    setRfq(state, data) {
      state.rfqs = data.RFQMboSet.RFQ;
    },
    setActiveBids(state, data) {
      console.log('setActiveBids data', data)
      state.activeBids = data.QueryC1EBACTIVEBIDSResponse.C1EBACTIVEBIDSSet.C1EBACTIVEBIDS;
    },
    setQuotations(state, data) {
      console.log('setQuotations data', data)
      state.quotations = data.QueryC1QUOTATIONLINEResponse.C1QUOTATIONLINESet.QUOTATIONLINE
      state.quotations.forEach(quotation => {
        if (!quotation.Attributes.MEMO) {
          quotation.Attributes.MEMO = '';
        } else {
          quotation.Attributes.MEMO = quotation.Attributes.MEMO.content;
        }
      })
      console.log('state.quotations', state.quotations)
    },
    setTechnicalCompliances(state, data) {
      console.log('setTechnicalCompliances data', data)
      state.technicalCompliances = data.QueryC1VENTECHSPECSResponse.C1VENTECHSPECSSet.C1VENTECHSPECS
      state.technicalCompliances.forEach(technicalCompliance => {
        if (!technicalCompliance.Attributes.C1REMARKS) {
          technicalCompliance.Attributes.C1REMARKS = '';
        } else {
          technicalCompliance.Attributes.C1REMARKS = technicalCompliance.Attributes.C1REMARKS.content;
        }
      })
      console.log('setTechnicalCompliances state', state)
    },
    setTermsAndConditions(state, data) {
      console.log('setTermsAndConditions data', data)
      state.termsAndConditions = data.RFQVENDORTERMMboSet.RFQVENDORTERM
      state.termsAndConditions.forEach(termsAndCondition => {
        if (!termsAndCondition.Attributes.C1VENDORREMARKS) {
          termsAndCondition.Attributes.C1VENDORREMARKS = '';
        } else {
          termsAndCondition.Attributes.C1VENDORREMARKS = termsAndCondition.Attributes.C1VENDORREMARKS.content;
        }
      })
      console.log('setTermsAndConditions state', state)
    },
    setQuotationsPayload(state, data) {
      console.log('setQuotationsPayload data', data)
      state.quotations = data.RFQMboSet.RFQ;

      state.quotations.forEach((quotation) => {
        console.log('quotation', quotation.Attributes)
        quotation.Attributes.HASCOMPLIED = false;
        quotation.Attributes.UNITPRICE = 0;
        quotation.Attributes.QUALIFICATIONS = '';
      });
    },
    setDeclineBidOptions(state, data) {
      state.declineBidOptions = data.ALNDOMAINMboSet.ALNDOMAIN;
    },
    setSelectedBid(state, data) {
      state.selectedBid = {
        rfqNum: data.Attributes.RFQNUM.content,
        description: data.RelatedMbos.RFQ[0].Attributes.DESCRIPTION.content
      }

      localStorage.setItem('selectedBid', JSON.stringify(state.selectedBid));
    },
    loadingStatus(state, newLoadingStatus) {
      state.loadingStatus = newLoadingStatus;
    },
    submitBid(state, result) {
      state.isBidSubmitted = result;
    }
  },
  actions: {
    async login({ commit }, user) {
      console.log('user', user.value.userID);
      return await axios.get(`/maxrest/rest/mbo/COMPANIES?_lid=maxadmin&_lpwd=P@ssw0rd&company=~eq~${user.value.userID}&c1ebidpass=~eq~${user.value.password}`)
        .then(({data}) => {
          console.log('response login', data)
          commit('setUser', data);
          return data;
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    logout({ state }) {
      state.user = {};
      localStorage.clear();
    },
    async getActiveBids({ commit, state }) {
      return await axios.get(`/maxrest/rest/os/C1EBACTIVEBIDS/?_lid=maxadmin&_lpwd=P@ssw0rd&vendor=~eq~${state.user.ID}`)
        .then(({data}) => {
          console.log('response getActiveBids', data)
          commit('setActiveBids', data);
          return data;
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    async getDeclineBidOptions({ commit }) {
      return await axios.get(`/maxrest/rest/mbo/ALNDOMAIN/?_lid=maxadmin&_lpwd=P@ssw0rd&domainid=~eq~C1DECREASON`)
        .then(({data}) => {
          console.log('response getDeclineBidOptions', data)
          commit('setDeclineBidOptions', data);
          return data;
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    async declineBid({}, payload) {
      return await axios.post(`/maxrest/rest/mbo/RFQVENDOR/${payload.value.RFQNumber}?_lid=maxadmin&_lpwd=P@ssw0rd&C1BIDDECLINED=1&C1DECLINEREASON=${payload.value.declineBidReason}`)
        .then(({data}) => {
          console.log('response declineBid', data)
          return data;
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    async getQuotations({ commit, state }, rfqNum) {
      return await axios.get(`/maxrest/rest/os/C1QUOTATIONLINE/?_lid=maxadmin&_lpwd=P@ssw0rd&rfqnum=~eq~${rfqNum}&vendor=~eq~${state.user.ID}`)
        .then(({data}) => {
          console.log('response getQuotations', data)
          commit('setQuotations', data);
          return data;
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    async quotationLine({}, payload) {
      console.log('payload.value.quotationLineID', payload.value.quotationLineID)
      console.log('payload.value.totalPrice', payload.value.totalPrice)
      console.log('payload.value.hasCompiled', payload.value.hasCompiled)
      console.log('payload.value.memo', payload.value.memo)
      
      return await axios.post(`/maxrest/rest/os/C1QUOTATIONLINE/${payload.value.quotationLineID}?C1VENDORUNITCOST=${payload.value.totalPrice}&C1VENDORCOMPLY=${payload.value.hasCompiled}&MEMO=${payload.value.memo}`)
        .then(({data}) => {
          console.log('response quotationLine', data)
          // commit('setQuotations', data);
          return data;
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    async getTechnicalCompliance({ commit, state }, rfqNum) {
      return await axios.get(`/maxrest/rest/os/C1VENTECHSPECS/?_lid=maxadmin&_lpwd=P@ssw0rd&c1rfqnum=~eq~${rfqNum}&c1vendor=~eq~${state.user.ID}`)
        .then(({data}) => {
          console.log('response technicalCompliance', data)
          commit('setTechnicalCompliances', data);
          return data;
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    async technicalCompliance({}, payload) {
      console.log('payload.value.techSpecsId', payload.value.techSpecsId)
      console.log('payload.value.hasCompiled', payload.value.hasCompiled)
      console.log('payload.value.remarks', payload.value.remarks)
      
      return await axios.post(`/maxrest/rest/mbo/C1VENTECHSPECS/${payload.value.techSpecsId}?C1COMPLY=${payload.value.hasCompiled}&C1REMARKS=${payload.value.remarks}`)
        .then(({data}) => {
          console.log('response technicalCompliance', data)
          // commit('setQuotations', data);
          return data;
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    async getTermsAndCondition({ commit, state }, rfqNum) {
      return await axios.get(`/maxrest/rest/mbo/RFQVENDORTERM/?_lid=maxadmin&_lpwd=P@ssw0rd&rfqnum=~eq~${rfqNum}&vendor=~eq~${state.user.ID}`)
        .then(({data}) => {
          console.log('response termsAndCondition', data)
          commit('setTermsAndConditions', data);
          return data;
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    async termsAndCondition({}, payload) {
      console.log('payload.value.vendorTermId', payload.value.vendorTermId)
      console.log('payload.value.hasCompiled', payload.value.hasCompiled)
      console.log('payload.value.remarks', payload.value.remarks)
      
      return await axios.post(`/maxrest/rest/os/C1RFQVENDORTERM/${payload.value.vendorTermId}?&C1VENDORCOMPLY=${payload.value.hasCompiled}&C1VENDORREMARKS=${payload.value.remarks}&siteId=BPI1`)
        .then(({data}) => {
          console.log('response technicalCompliance', data)
          // commit('setQuotations', data);
          return data;
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    async getCompanyContact({ state, commit }) {
      return await axios.get(`/maxrest/rest/mbo/COMPCONTACT?_lid=maxadmin&_lpwd=P@ssw0rd&company=~eq~${state.user.ID}`)
        .then(({data}) => {
          console.log('response getCompanyContact', data)
          commit('setCompanyContact', data);
          return data;
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    async getCompanies({ commit, state }) {
      commit('loadingStatus', true);

      return await axios.get(`/maxrest/rest/mbo/COMPANIES?_lid=maxadmin&_lpwd=P@ssw0rd&company=~eq~${state.user.ID}`)
        .then(({data}) => {
          commit('setCompanies', data);
          commit('loadingStatus', false);

          console.log('res getCompanies', data.COMPANIESMboSet.COMPANIES[0].Attributes);
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    async getRfq({ commit, state }) {
      commit('loadingStatus', true);

      return await axios.get(`/maxrest/rest/mbo/RFQ?_lid=maxadmin&_lpwd=P@ssw0rd&company=~eq~${state.user.ID}`)
        .then(({data}) => {
          commit('setRfq', data);
          // commit('setQuotationsPayload', data);
          commit('loadingStatus', false);

          console.log('res getRfq', data.RFQMboSet);
        })
    },
    // TODO: what is this
    async submitBid({ commit, state }) {
      return await axios.get(`/maxrest/rest/mbo/RFQ?_lid=maxadmin&_lpwd=P@ssw0rd&company=~eq~${state.user.ID}`)
        .then(({data}) => {
          commit('submitBid', true);

          console.log('res submitBid', data);
        })
    },
    async changePassword({ commit, state }, payload) {
      commit('loadingStatus', true);

      // TODO: make the lid & lpwd dynamic or stored in env.
      return await axios.post(`/maxrest/rest/mbo/COMPANIES/${state.user.companyID}?lid=maxadmin&_lpwd=P@ssw0rd&C1EBIDPASS=${payload}`)
        .then(({data}) => {
          commit('loadingStatus', false);
          console.log('response changePassword', data)
          // commit('setQuotations', data);
          return data;
        })
        .catch(error => {
          console.log('error', error)
        })
    },
  },
  getters: {
    getRfq: state => {
      console.log('state', state);
      return state.rfqs;
    },
    loadingStatus: state => {
      return state.loadingStatus;
    },
    isBidSubmitted: state => {
      return state.isBidSubmitted;
    }
  }
});