import axios from 'axios'
import moment from 'moment'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    info: null,
    wall: [],
    users: null
  },
  getters: {
    getInfo(state) {
      if (!state.info) return
      let result = {
        ...state.info
      }
      // если понадобиться то добавить склонение (для публикаций, но нужен или пол или отчество)
      // библиотека - petrovich
      result.fullName = result.first_name + ' ' + result.last_name
      result.ages = moment().diff(result.birth_date, 'years')
      result.is_onlined = moment().diff(moment(result.last_online_time), 'seconds') <= 60
      result.photo = result.photo || '../static/img/user/default_avatar.svg'
      return result
    },
    getUsersInfo(state, getters, rootState) {
      if (!state.users) return
      let result = {
        ...state.users
      }

      // если понадобиться то добавить склонение (для публикаций, но нужен или пол или отчество)
      // библиотека - petrovich
      result.fullName = result.first_name + ' ' + result.last_name
      result.ages = moment().diff(result.birth_date * 1000, 'years')
      result.is_onlined = moment().diff(moment(result.last_online_time), 'seconds') <= 60
      result.photo = result.photo || '../static/img/user/default_avatar.svg'
      result.is_friend = rootState.profile.friends.result.friends.find(el => el.id === result.id) ? true : false
      return result
    },
    getWall(state) {
      return state.wall
    },
    getWallPostedLength: s => s.wall.filter(el => el.type === 'POSTED').length,
    getWallQueuedLength: s => s.wall.filter(el => el.type === 'QUEUED').length,
    getWallDeletedLength: s => s.wall.filter(el => el.type === 'DELETED').length
  },
  mutations: {
    setInfo: (s, info) => (s.info = info),
    setWall: (s, wall) => (s.wall = wall),
    setWallById: (s, payload) => {
      s.wall[s.wall.indexOf(s.wall.find(el => el.id === payload.id))] = payload.value
    },
    setCommentsById: (s, payload) => {
      const post = s.wall[s.wall.indexOf(s.wall.find(el => el.id === payload.post_id))]
      const newPost = [...payload.value.data, ...post.comments.data]
      const filteredStrings = newPost.filter((thing, index, self) => index === self.findIndex(t => t.id === thing.id))
      const revers = filteredStrings.sort(function(a, b) {
        return new Date(a.time) - new Date(b.time)
      })

      s.wall.forEach(el => {
        if (el.id === payload.post_id) {
          el.comments.total = payload.value.total
        }
      })

      s.wall[s.wall.indexOf(s.wall.find(el => el.id === payload.post_id))].comments.data = [...revers]
    },
    setUsersInfo: (s, info) => {
      return (s.users = info)
    }
  },
  actions: {
    async apiInfo({ commit }, id) {
      await axios({
        url: `users/${id}`,
        method: 'GET'
      })
        .then(response => {
          commit('setInfo', response.data.data)
        })
        .catch(error => {})
    },

    async apiWall({ getters, commit }, data) {
      console.log(data.payload)
      console.log(data.id)
      let query = []

      data.payload &&
        Object.keys(data.payload).map(el => {
          data.payload[el] && query.push(`${el}=${data.payload[el]}`)
        })
      return await axios({
        url: `users/${data.id}/wall?${query.join('&')}`,
        method: 'GET'
      })
        .then(response => {
          const previousWall = getters.getWall
          const wall = response.data.data
          const newsWall = [...previousWall, ...wall]
          const chechcDobleWall = newsWall.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)

          commit('setWall', chechcDobleWall)

          return response.data.total
        })
        .catch(error => {})
    },

    async apiWallById({ commit }, id) {
      await axios({
        url: `post/${id}`,
        method: 'GET'
      })
        .then(response => {
          commit('setWallById', {
            id,
            value: response.data.data
          })
        })
        .catch(error => {})
    },

    async apiCommentsById({ commit }, id) {
      await axios({
        url: `post/${id}/comments`,
        method: 'GET'
      })
        .then(response => {
          commit('setCommentsById', response.data.data)
        })
        .catch(error => {})
    },

    async userInfoId({ commit, dispatch }, id) {
      await axios({
        url: `users/${id}`,
        method: 'GET'
      })
        .then(async response => {
          await dispatch('apiWall', {
            id
          })
          commit('setUsersInfo', response.data.data)
        })
        .catch(error => {})
    }
  }
}
