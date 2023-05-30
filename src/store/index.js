import { createStore } from 'vuex'
import http from '@/plugins/axios'
export default createStore({
  state: {
    me: {},
    suppliers: [],
    brands:[],
    groups:[],
    addInvoice:[]
  },
  getters: {

  },
  mutations: {
    getMe(state, data) {
      state.me = data
    },
    getSuppliers(state, data) {
      state.suppliers = data
    },
    getGrops(state, data){
      state.groups = data
    },
    getBrands(state, data){
      state.brands = data
    },
    addInvoice(state, data){
      state.brands = data
    }
  },
  actions: {
    getMe({ commit }) {
      http.get('/api/user/me').then(res => {
        commit('getMe', res.data)
      })
    },
    getSuppliers({ commit }, param) {
      http.get(`/api/warehouse/supplier/`,{
        params:{
          per_page: param?.per_page,
          page: param?.page,
        }
      }).then(res => {
        res.data.results.forEach((item, index) => {
          item.index = param?.page * param?.per_page - (param?.per_page - 1) + index
      })
        commit('getSuppliers', res.data.results)
      }).catch(err => {
        console.log(err)
      })
    },
    getGrops({commit}, param){
      http.get('/api/warehouse/group/',{
        params:{
          per_page: param?.per_page,
          page: param?.page,
        }
      }).then(res => {
        res.data.results.forEach((item, index) => {
          item.index = param?.page * param?.per_page - (param?.per_page - 1) + index
      })
      commit('getGrops', res.data.results)
      }).catch(err=>{
        console.log(err)
      })
    },
    getBrands({commit}, param){
      http.get('/api/warehouse/brand/',{
        params:{
          per_page: param?.per_page,
          page: param?.page,
        }
      }).then(res => {
        res.data.results.forEach((item, index) => {
          item.index = param?.page * param?.per_page - (param?.per_page - 1) + index
      })
        commit('getBrands', res.data.results)
      }).catch(err=>{
        console.log(err)
      })
    },
  },
  modules: {

  }
})
