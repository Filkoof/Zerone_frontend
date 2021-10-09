import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    loadUsers: false,
    totalUsers: 0,
    perPageUsers: 0,
    loadNews: false,
    totalNews: 0,
    perPageNews: 0,
    searchText: '',
    tabs: [
      {
        id: 'users',
        text: 'Люди'
      },
      {
        id: 'news',
        text: 'Новости'
      }
    ],
    tabSelect: 'users',
    result: {
      users: [],
      news: []
    },
    status: ''
  },
  getters: {
    searchText: s => s.searchText,
    tabs: s => s.tabs,
    tabSelect: s => s.tabSelect,
    getResult: s => s.result,
    getResultById: s => id => s.result[id],
    getStatus: s => s.status,
    getLoadUsers: s => s.loadUsers,
    getTotalUsers: s => s.totalUsers,
    getPerPageUsers: s => s.perPageUsers,
    getLoadNews: s => s.loadNews,
    getTotalNews: s => s.totalNews,
    getPerPageNews: s => s.perPageNews
  },
  mutations: {
    setSearchText: (s, value) => (s.searchText = value),
    setTabSelect: (s, id) => (s.tabSelect = id),
    routePushWithQuery(state, id) {
      let query = {}
      query.tab = id
      if (state.searchText.length > 0) query.text = state.searchText
      router.push({
        name: 'Search',
        query
      })
    },
    setResult: (s, result) => (s.result[result.id] = result.value),
    setLoadUsers: (s, state) => (s.loadUsers = state),
    setTotalUsers: (s, total) => (s.totalUsers = total),
    setPerPageUsers: (s, perPage) => (s.perPageUsers = perPage),
    setloadNews: (s, state) => (s.loadNews = state),
    setTotalNews: (s, total) => (s.totalNews = total),
    setPerPageNews: (s, perPage) => (s.perPageNews = perPage)
  },
  actions: {
    clearSearch({ commit }) {
      commit('setSearchText', '')
      commit('setResult', {
        id: 'users',
        value: []
      })
      commit('setResult', {
        id: 'news',
        value: []
      })
    },
    changeTab({ commit }, id) {
      commit('setTabSelect', id)
      commit('routePushWithQuery', id)
    },
    async searchUsers({ commit }, payload) {
      let query = []
      payload &&
        Object.keys(payload).map(el => {
          payload[el] && query.push(`${el}=${payload[el]}`)
        })
      await axios({
        url: `users/search?${query.join('&')}`,
        method: 'GET'
      })
        .then(response => {
          const previousUsers = getters.getResult['news']
          const users = response.data.data
          const newsUsers = [...previousUsers, ...users]
          const chechcDobleUsers = newsUsers.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)

          commit('setResult', {
            id: 'users',
            value: chechcDobleUsers
          }),
            commit('setTotalUsers', response.data.total),
            commit('setLoadUsers', false)
        })
        .catch(error => {})
    },
    async searchNews({ commit, getters }, payload) {
      let query = []
      payload &&
        Object.keys(payload).map(el => {
          payload[el] && query.push(`${el}=${payload[el]}`)
        })
      await axios({
        url: `post?${query.join('&')}`,
        method: 'GET'
      })
        .then(response => {
          const previousNews = getters.getResult['news']
          const news = response.data.data
          const newsResp = [...previousNews, ...news]
          const chechcDobleNews = newsResp.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)

          commit('setResult', {
            id: 'news',
            value: chechcDobleNews
          }),
            commit('setTotalNews', response.data.total),
            commit('setloadNews', false)
        })
        .catch(error => {})
    }
  }
}
