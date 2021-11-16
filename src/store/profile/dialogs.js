import axios from 'axios'
import moment from 'moment'
import { checkFinishTypingMessage, checkTypingMessage, getMessage, unreadCount } from '../../api/socetIO'

const mergeIncomingMessages = ({ commit, state }, response) => {
  const fromServerNewFirst = response.data.data
  fromServerNewFirst.forEach(m => (m.sid = '' + m.id))
  const onlyNewMessages = fromServerNewFirst.filter(msgServer => !state.messages.some(m => m.id === msgServer.id))
  if (onlyNewMessages.length > 0) {
    commit('addMessages', { messages: onlyNewMessages, total: response.data.total })
  }
}

//  [msg 0] [msg 1] .... [msg 10]
//                          ^
//                          oldestLoadedId
// <-newest messages------------------------------------------------------older
export default {
  namespaced: true,
  state: {
    dialogs: [],
    unreadedMessages: 0, // total unreaded
    messages: [], // sorted oldest->newest 0 is oldest
    totalMessages: null,
    dialogsLoaded: false,
    activeId: null,
    oldLastKnownMessageId: null,
    isHistoryEndReached: false,
    newMessage: [],
    total:0,
    typeMessage: [],
  },
  getters: {
    oldestKnownMessageId: s => (s.messages.length > 0 ? s.messages[0]['id'] : null),
    getDialogs: s => {
      const result = [...s.dialogs]

      // result.forEach(dialog => {
      //   // dialog.last_message = dialog.last_message || {}
      //   // dialog.last_message.isSentByMe = dialog.last_message.isSentByMe || true
      //   // dialog.last_message.recipient = dialog.last_message.recipient || {}
      //   // dialog.last_message.recipient.last_online_time = dialog.last_message.recipient.last_online_time * 1000 || 0
      //   // dialog.last_message.recipient.id = dialog.last_message.recipient.id || dialog.last_message.recipient_id
      //   // dialog.last_message.recipient.photo = dialog.last_message.recipient.photo || '../static/img/user/default_avatar.svg'
      //   // dialog.last_message.recipient.first_name = dialog.last_message.recipient.first_name || 'Name'
      //   // dialog.last_message.recipient.last_name = dialog.last_message.recipient.last_name || 'LastName'
      //   // dialog.last_message.time = dialog.last_message.time * 1000
      //   // dialog.last_message.last_online_time = dialog.last_message.last_online_time * 1000
      //   // dialog.last_message.photo = dialog.last_message.photo || '../static/img/user/default_avatar.svg'
      //   dialog.recipient_id.photo = dialog.recipient_id.photo || '../static/img/user/default_avatar.svg'
      //   dialog.recipient_id.last_online_time = dialog.recipient_id.last_online_time * 1000 || 0
      // })

      return result
    },
    getActiveDialog: s => s.dialogs.find(el => el.id == s.activeId),
    getActiveDialogId: s => s.activeId,
    dialogsLoaded: s => s.dialogsLoaded,
    unreadedMessages: s => s.unreadedMessages,
    hasOpenedDialog: s => dialogId => !!s.dialogs.find(el => el.id == dialogId),
    isHistoryEndReached: s => s.isHistoryEndReached,
    getMessages: s => {
      const result = [...s.messages]

      result.forEach(message => {
        // message.last_message = message.last_message || {}
        // message.last_message.isSentByMe = message.last_message.isSentByMe || true
        // message.last_message.recipient = message.last_message.recipient || {}
        // message.last_message.recipient.last_online_time = message.last_message.recipient.last_online_time * 1000 || 0
        // message.last_message.recipient.id = message.last_message.recipient.id || message.last_message.recipient_id
        // message.last_message.recipient.photo = message.last_message.recipient.photo || '../static/img/user/default_avatar.svg'
        // message.last_message.recipient.first_name = message.last_message.recipient.first_name || 'Name'
        // message.last_message.recipient.last_name = message.last_message.recipient.last_name || 'LastName'
        // message.recipient.photo = message.recipient.photo || '../static/img/user/default_avatar.svg'
        // message.time = message.time * 1000
        // message.recipient.last_online_time = message.recipient.last_online_time * 1000
      })

      return result
    },
    getNewMessage: s => s.newMessage,
    getTotalMessage: s => s.total,
    getTypeMessage: s => s.typeMessage,
  },

  mutations: {
    setUnreadedMessages: (s, unread) => (s.unreadedMessages = unread),
    setDialogs: (s, dialogs) => (s.dialogs = dialogs),
    dialogsLoaded: s => (s.dialogsLoaded = true),
    addMessages: (s, { messages, total }) => {
      if(messages.length == 1) s.messages = [...s.messages, ...messages]
      let message = messages.reverse();
      s.messages = [...message, ...s.messages]
      s.total = total
    },
    selectDialog: (state, dialogId) => {
      state.activeId = dialogId
      state.messages = []
      state.isHistoryEndReached = false
    },
    markEndOfHistory: s => (s.isHistoryEndReached = true),
    setNewMessage: (s, messages) => {
      s.newMessage = [...s.newMessage, ...messages];
      s.newMessage.sort((a, b) => a.time - b.time);
    },
    removeNewMessage: (s, messages) => {
        s.newMessage = messages;
    },
    setTotalMessage: (s, total) => s.total = total,
    setTypeMessage: (s, typeMessage) => {
      let typeArr = [...s.typeMessage, typeMessage];
      const result = typeArr.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.authorId === item.authorId && t.dialog === item.dialog
          ))
      )
      s.typeMessage = [...result];
    },
    removeTypeMessage: (s, typeMessage) =>{
      s.typeMessage = [...s.typeMessage].filter(i => i.authorId !== typeMessage.authorId && i.dialog !== typeMessage.dialog )
    }
  },

  actions: {
    closeDialog({ commit }) {
      commit('selectDialog', null)
    },

    async switchDialog({ state, getters, commit, dispatch }, dialogId) {
      if (!state.dialogsLoaded) {
        await dispatch('apiLoadAllDialogs')
      }
      if (getters.hasOpenedDialog(dialogId)) {
        commit('selectDialog', dialogId)
        await dispatch('loadFreshMessages', dialogId)
      } else {
        console.log('what to do with this dialog???? ' + dialogId)
      }
    },

    async apiLoadAllDialogs({ commit }, payload) {
      let query = []
      payload &&
        Object.keys(payload).map(el => {
          payload[el] && query.push(`${el}=${payload[el]}`)
        })
      return await axios({
        url: `dialogs?${query.join('&')}`,
        method: 'GET'
      })
        .then(response => {
          commit('setDialogs', response.data.data)
          commit('dialogsLoaded')
          return response.data
        })
        .catch(error => {
          console.error(error)
        })
    },

    async createDialogWithUser({ dispatch, commit }, userId) {
      await axios({
        url: 'dialogs',
        method: 'POST',
        data: {
          users_ids: [userId]
        }
      })
        .then(async response => {
          const dialogId = response.data.data.id
          await dispatch('apiLoadAllDialogs', dialogId)
          await dispatch('switchDialog', dialogId)
        })
        .catch(error => {
          console.error(error)
        })
    },

    async loadFreshMessages({ commit, state, dispatch }, {itemPerPage=10, offset=0}) {
      await axios({
        url: `dialogs/${state.activeId}/messages`,
        method: 'GET',
        params: {
          itemPerPage: itemPerPage,
          offset: offset
        }
      })
        .then(response => {
          mergeIncomingMessages({ commit, state }, response)
          if (state.chaseHistoryUnitilMessageId !== null) {
            // dispatch('')
          }
        })
        .catch(error => {
          console.error(error)
        })
    },

    async loadOlderMessages({ commit, getters, state }, {itemPerPage=10, offset=0}) {
      await axios({
        url: `dialogs/${state.activeId}/messages`,
        params: {
          fromMessageId: getters.oldestKnownMessageId,
          offset: offset,
          itemPerPage: itemPerPage
        },
        method: 'GET'
      })
        .then(response => {
          mergeIncomingMessages({ commit, state }, response)
          if (response.data.data.length == 0) {
            commit('markEndOfHistory')
          }
        })
        .catch(error => {
          console.error(error)
        })
    },

    async postMessage({ dispatch }, payload) {
      await axios({
        url: `dialogs/${payload.id}/messages`,
        method: 'POST',
        data: {
          message_text: payload.message_text
        }
      })
        .then(response => {
          dispatch('loadFreshMessages', payload.id)
        })
        .catch(error => {
          console.error(error)
        })
    },

    async apiUnreadedMessages({ commit }) {
      await axios({
        url: 'dialogs/unreaded',
        method: 'GET'
      })
        .then(response => {
          commit('setUnreadedMessages', response.data.data.count)
        })
        .catch(error => {
          console.error(error)
        })
    },

    loadMessages({state, commit, rootState }){
      function callback(response){
        if(response.data.author_id == rootState.profile.info.info.id) return
        const data = new Object(response.data);
        data.sendByMe = !data.sendByMe;
        data.time = new Date(data.time * 1000);
        data.sid = '' + data.id;

        const messages = [];
        messages.push(data);

        const total = state.total ? state.total + 1 : 1;

        const recipient = state.dialogs.find(el => el.id == data['dialog_id']);

        const params = {
          messages,
          total,
        }

        const newMessage = [];
        data.recipient = recipient['recipient_id'];
        newMessage.push(data);

        commit('addMessages', params)
        commit('setNewMessage', newMessage)
      }
      getMessage(callback);
    },

    checkTypingMessage({commit}){
      function callback (response){
        commit('setTypeMessage', response)
      };
      checkTypingMessage(callback)
    },

    checkFinishTypingMessage({commit}){
      function callback (response){
        commit('removeTypeMessage', response)
      };
      checkFinishTypingMessage(callback)
    },

    checkUnreadCount({commit}){
      function callback(response){
        console.log(response)
      }
      unreadCount(callback)
    }
  }
}
