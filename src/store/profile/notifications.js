import axios from 'axios'
import { responseNotification } from '../../api/socetIO'

export default {
  namespaced: true,
  state: {
    notifications: []
  },
  getters: {
    getNotifications: s => s.notifications,
    getNotificationsLength: s => s.notifications.length,
    getNotificationsTextType: s => type => {
      const lang = localStorage.getItem('lang') || 'ru'
      if (lang === 'ru') {
        switch (type) {
          case 'POST':
            return 'опубликовал новую запись'
          case 'POST_COMMENT':
            return 'оставил комментарий'
          case 'COMMENT_COMMENT':
            return 'ответил на ваш комментарий'
          case 'FRIEND_REQUEST':
            return 'добавил в друзья нового пользователя'
          case 'FRIEND_BIRTHDAY':
            return 'день рождение'
          case 'MESSAGE':
            return 'прислал сообщение'
        }
      }
      if (lang === 'en') {
        switch (type) {
          case 'POST':
            return 'posted a new post'
          case 'POST_COMMENT':
            return 'left a comment'
          case 'COMMENT_COMMENT':
            return 'replied to your comment'
          case 'FRIEND_REQUEST':
            return 'added a new user as a friend'
          case 'FRIEND_BIRTHDAY':
            return 'birthday'
          case 'MESSAGE':
            return 'sent a message'
        }
      }
    }
  },
  mutations: {
    setNotifications: (s, value) => s.notifications = value
  },
  actions: {
    async apiNotifications({
      state,
      commit,
      dispatch
    }) {
      await axios({
        url: 'notifications',
        method: 'GET'
      }).then(response => {
        if (`${response.data.data.map(z => z.sent_time)}` !== `${state.notifications.map(z => z.sent_time)}`) {
          const result = response.data.data.map(el => {
            if (!el.entity_author) el.entity_author = {}
            if (!el.entity_author.photo) el.entity_author.photo = '../static/img/user/default_avatar.svg'
            if (!el.entity_author.first_name) el.entity_author.first_name = `Имя автора с ID: ${el.id}`
            if (!el.entity_author.last_name) el.entity_author.last_name = `Фамилия автора с ID: ${el.id}`
            if (!el.event_type) el.event_type = 'POST'
            return el;
          });
          commit('setNotifications', result)
        }
        // добавить когда будет прод
        // setTimeout(() => {
        //   dispatch('apiNotifications')
        // }, 5000)
      }).catch(() => {})
    },
    async readNotifications({
      state,
      commit,
      dispatch
    }, notificationId) {
      if (!notificationId) {
        await axios({
          url: 'notifications?all=true',
          method: 'PUT'
        }).then(response => {}).catch(() => {})
      } else {
        await axios({
          url: `notifications?id=${notificationId}`,
          method: 'PUT'
        }).then(response => {}).catch(() => {})
      }
    },

    socketNotifications(){
      function callback(response){
        console.log(response)
      }
      responseNotification(callback)
    }
  }
}
