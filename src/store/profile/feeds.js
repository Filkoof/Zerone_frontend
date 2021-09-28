import axios from 'axios'

export default {
  namespaced: true,
  state: {
    feeds: []
  },
  getters: {
    getFeeds(state) {
      return state.feeds
    },
  },
  mutations: {
    setFeeds: (s, feeds) => s.feeds = feeds,
    setCommentsById: (s, payload) => {
      s.feeds[s.feeds.indexOf(s.feeds.find(el => el.id === payload.post_id))].comments = payload.value
    },
    setFeedsById: (s, payload) => s.feeds[s.feeds.indexOf(s.feeds.find(el => el.id === payload.id))] = payload
  },
  actions: {
    async apiFeeds({
      getters,
      commit
    }, payload) {
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `feeds?${query.join('&')}`,
        method: 'GET'
      }).then(response => {
        const previousPost = getters.getFeeds;
        const post = response.data.data;
        const newsPost = [...previousPost, ...post];

        commit('setFeeds', newsPost)
      }).catch(() => {})
    },
    async apiFeedsById({
      commit
    }, post_id) {
      await axios({
        url: `post/${post_id}`,
        method: 'GET'
      }).then(response => {
        console.log("TCL: apiFeeds -> response", response)
        commit('setFeedsById', response.data)
      }).catch(() => {})
    },
    async actionsFeed({
      dispatch
    }, payload) {
      console.log("TCL: payload", payload)
      let url = payload.edit ? `post/${payload.post_id}` : `users/${payload.id}/wall`
      let method = payload.edit ? 'PUT' : 'POST'
      if (payload.publish_date) url += '?publish_date=' + payload.publish_date
      await axios({
        url,
        method,
        data: {
          title: payload.title,
          post_text: payload.post_text,
          tags: payload.tags
        }
      }).then(response => {
        if (payload.edit) {
          dispatch('users/info/apiWallById', payload.post_id, {
            root: true
          })
          payload.route === 'News' ?
            dispatch('apiFeeds') :
            dispatch('users/info/apiWall', {
              id: payload.id
            }, {
              root: true
            })
        } else {
          payload.route === 'News' ?
            dispatch('apiFeeds') :
            dispatch('users/info/apiWall', {
              id: payload.id
            }, {
              root: true
            })
        }
      }).catch(() => {})
    },
    async deleteFeeds({
      dispatch
    }, payload) {
      await axios({
        url: `post/${payload.post_id}`,
        method: 'DELETE'
      }).then(response => {
        payload.route === 'News' ?
          dispatch('apiFeeds') :
          dispatch('users/info/apiWall', {
            id: payload.id
          }, {
            root: true
          })
      }).catch(() => {})
    },
    async recoverFeeds({
      dispatch
    }, payload) {
      await axios({
        url: `post/${payload.post_id}/recover`,
        method: 'PUT'
      }).then(response => {
        payload.route === 'News' ?
          dispatch('apiFeeds') :
          dispatch('users/info/apiWall', {
            id: payload.id
          }, {
            root: true
          })
      }).catch(() => {})
    }
  }
}
