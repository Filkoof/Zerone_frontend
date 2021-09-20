import axios from 'axios'
import router from '../../router'
import {
  url
} from '@/utils/url.js';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    modalOpen: false,
    modalTitle: '',
    modalLink: ''
  },
  getters: {
    apiToken: s => s.token,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {
    setToken: (s, token) => s.token = token,
    setStatus: (s, status) => s.status = status,
    setModal: (s, modalStatus) => s.modalOpen = modalStatus,
    setModalTitle: (s, modalTitle) => s.modalTitle = modalTitle,
    setModalLink: (s, modalLink) => s.modalLink = modalLink
  },
  actions: {
    async register({
      dispatch
    }, user) {
      await axios({
        url: url + 'api/v1/account/register',
        data: user,
        method: 'POST'
      }).then(async response => {
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Выслано письмо с подтверждением'
        }, {
          root: true
        })
        router.push({
          name: 'RegisterLetter'
        });
      }).catch(error => {
        dispatch('global/alert/setAlert', {
          status: 'error',
          text: 'Не удалось зарегистрироваться'
        }, {
          root: true
        })
        router.push({
          name: 'RegisterFailed'
        });
      })
    },
    async confirmRegistration({
      dispatch
    }, user) {
      await axios({
        url: url + 'account/register/confirm',
        data: user,
        method: 'POST'
      }).then(async response => {
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Регистрация успешно подтверждена'
        }, {
          root: true
        })
        router.push({
          name: 'RegisterSuccess'
        });
      }).catch(async error => {
        dispatch('global/alert/setAlert', {
          status: 'error',
          text: 'Не удалось подтвердить регистрацию'
        }, {
          root: true
        })
        router.push({
          name: 'RegisterConfirmationFailed'
        });
      })
    },
    async login({
      commit
    }, user) {
      commit('setStatus', 'loading')
      await axios({
        url: url + 'api/v1/auth/login',
        data: user,
        method: 'POST'
      }).then(response => {
        const token = response.data.data.token
        localStorage.setItem('user-token', token)
        axios.defaults.headers.common['Authorization'] = token
        commit('setToken', token)
        commit('setStatus', 'success')
        commit('profile/info/setInfo', response.data.data, {
          root: true
        })
      }).catch(error => {
        commit('setStatus', 'error')
        localStorage.removeItem('user-token')
      })
    },
    async logout({
      commit,
      dispatch
    }) {
      await axios({
        url: url + 'api/v1/auth/logout',
        method: 'POST'
      }).then(() => {
        commit('setToken', '')
        commit('setStatus', 'logout')
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Вы вышли из системы'
        }, {
          root: true
        })
        localStorage.removeItem('user-token')
        delete axios.defaults.headers.common['Authorization']
        window.location.reload()
      }).catch(error => {})
    },
    async modalOff({
      commit
    }) {
      commit('setModal', false)
    },
    async modalOn({
      commit
    }, {
      header,
      link
    }) {
      commit('setModal', true)
      commit('setModalTitle', header)
      commit('setModalLink', link)
    }
  },
}
