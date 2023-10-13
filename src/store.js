import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: {
      ID: localStorage.getItem('vendorID') || null,
      C1EBIDPASS: localStorage.getItem('vendorC1EBIDPASS') || null,
      token: localStorage.getItem('vendor') || false
    },
    companyContact: {},
    companies: {},
    rfqs: {},
    bidding: [],
    loadingStatus: false,
    isBidSubmitted: false,
  },
  mutations: {
    setUser(state, data) {
      state.user.token = true;
      state.user.ID = data.COMPANIESMboSet.COMPANIES[0].Attributes.COMPANY.content;
      state.user.C1EBIDPASS = data.COMPANIESMboSet.COMPANIES[0].Attributes.C1EBIDPASS.content;
      localStorage.setItem('vendor', true);
      localStorage.setItem('vendorID', data.COMPANIESMboSet.COMPANIES[0].Attributes.COMPANY.content);
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
    async getCompanies({ state, commit }) {
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
    async getRfq({ state, commit }) {
      commit('loadingStatus', true);

      return await axios.get(`/maxrest/rest/mbo/RFQ?_lid=maxadmin&_lpwd=P@ssw0rd&company=~eq~${state.user.ID}`)
        .then(({data}) => {
          commit('setRfq', data);
          commit('loadingStatus', false);

          console.log('res getRfq', data.RFQMboSet);
        })
    },
    async submitBid({ state, commit }) {
      return await axios.get(`/maxrest/rest/mbo/RFQ?_lid=maxadmin&_lpwd=P@ssw0rd&company=~eq~${state.user.ID}`)
        .then(({data}) => {
          commit('submitBid', true);

          console.log('res submitBid', data);
        })
    }
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