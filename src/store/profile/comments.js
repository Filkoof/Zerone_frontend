import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  actions: {
    async commentsById({ commit }, post_id) {
      await axios({
        url: `post/${post_id}`,
        method: 'GET'
      })
        .then(response => {
          let dataComments = {
            post_id: data.post_id,
            value: response.data.data
          }

          router.history.current.name === 'News'
          console.log(dataComments)
            ? commit('profile/feeds/setFeedsById', dataComments, {
                root: true
              })
            : commit('users/info/setCommentsById', dataComments, {
                root: true
              })
        })
        .catch(() => {})
    },
    async newComment({ dispatch }, payload) {
      await axios({
        url: `post/${payload.post_id}/comments`,
        method: 'POST',
        data: {
          parent_id: payload.parent_id,
          comment_text: payload.text
        }
      })
        .then(() => {
          dispatch('addCommentsById', payload)
        })
        .catch(() => {})
    },
    async editComment({ dispatch }, payload) {
      await axios({
        url: `post/${payload.post_id}/comments/${payload.id}`,
        method: 'PUT',
        data: {
          comment_text: payload.text
        }
      })
        .then(() => {
          dispatch('addCommentsById', payload)
        })
        .catch(() => {})
    },
    async deleteComment({ dispatch }, payload) {
      await axios({
        url: `post/${payload.post_id}/comments/${payload.id}`,
        method: 'DELETE'
      })
        .then(() => {
          dispatch('addCommentsById', payload)
        })
        .catch(() => {})
    },
    async recoverComment({ dispatch }, payload) {
      await axios({
        url: `post/${payload.post_id}/comments/${payload.id}/recover`,
        method: 'PUT'
      })
        .then(() => {
          dispatch('addCommentsById', payload)
        })
        .catch(() => {})
    },
    async commentActions({ dispatch }, payload) {
      payload.edit ? await dispatch('editComment', payload) : await dispatch('newComment', payload)
    },
    async addCommentsById({ commit }, data) {
      await axios({
        url: `post/${data.post_id}/comments?offset=${data.offset}&itemPerPage=${data.perPage}`,
        method: 'GET'
      })
        .then(response => {
          console.log(response)
          let dataComments = {
            post_id: data.post_id,
            value: response.data
          }

          console.log(dataComments)

          router.history.current.name === 'News'
            ? commit('profile/feeds/setFeedsCommentsById', dataComments, {
                root: true
              })
            : commit('users/info/setCommentsById', dataComments, {
                root: true
              })
        })
        .catch(() => {})
    }
  }
}
