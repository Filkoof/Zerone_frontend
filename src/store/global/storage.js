import axios from 'axios'

export default {
  namespaced: true,
  state: {
    storage: null
  },
  getters: {
    getStorage: s => s.storage,
  },
  mutations: {
    setStorage: (s, value) => s.storage = value
  },
  actions: {
    async apiStorage({
      commit
    }, { file, typeImage = 'IMAGE' }) {
      let formData = new FormData();
      formData.append('file', file);
      await axios({
        url: `storage?type=${typeImage}`,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        commit('setStorage', response.data.data)
      }).catch(() => {})
    },
  }
}
