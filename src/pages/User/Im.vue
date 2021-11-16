<template lang="pug">
.im
    .im__dialogs
        im-dialog(
            v-for='dialog in getDialogs',
            :key='dialog.id',
            :info='dialog',
            :push='countPush(dialog.unread_count)',
            :me='dialog.sendByMe',
            :active='getActiveDialog && dialog.id === getActiveDialog.id',
            :online='checkOnlineUser(dialog.recipient_id.last_online_time)',
            @click.native='clickOnDialog(dialog.id)'
        )

    .im__chat(v-if='getActiveDialog')
        im-chat(
            :info='getActiveDialog',
            :messages='getMessages',
            :online='checkOnlineUser(getActiveDialog.recipient_id.last_online_time)'
        )
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import ImDialog from '@/components/Im/Dialog'
import ImChat from '@/components/Im/Chat'
import isLoading from '@/components/isLoading'

export default {
  name: 'Im',
  components: { ImDialog, ImChat, isLoading },
  data: () => ({
    intervalForMessages: null,
    isLoad: false
  }),

  computed: {
    ...mapGetters('profile/dialogs', ['getMessages', 'getActiveDialog', 'getDialogs'])
  },
  methods: {
    ...mapActions('profile/dialogs', [
      'loadMessages',
      'checkTypingMessage',
      'checkFinishTypingMessage',
      'loadFreshMessages',
      'switchDialog',
      'closeDialog',
      'createDialogWithUser',
      'apiLoadAllDialogs'
    ]),
    countPush(unread) {
      return unread > 0 ? unread : null
    },
    checkOnlineUser(time) {
      return moment().diff(moment(time), 'seconds') <= 60
    },
    clickOnDialog(dialogId) {
      this.$router.push({ name: 'Im', query: { getActiveDialog: dialogId } })
    },
    async selectDialogByRoute(route, vm) {
      if (route.query.getActiveDialog) {
        vm.switchDialog(route.query.getActiveDialog)
      } else if (route.query.userId) {
        vm.createDialogWithUser(route.query.userId)
      } else if (vm.getDialogs.length > 0) {
        vm.$router.push({ name: 'Im', query: { getActiveDialog: vm.getDialogs[0].id } })
      } else {
        await vm.apiLoadAllDialogs().then(resp => {
          this.offset = resp
        })
        if (vm.getDialogs.length > 0) {
          vm.$router.push({ name: 'Im', query: { getActiveDialog: vm.getDialogs[0].id } })
        }
        console.log('No dialogs at all')
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      vm.selectDialogByRoute(to, vm)
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.selectDialogByRoute(to, this)
    next()
  },
  beforeDestroy() {
    this.closeDialog()
  },
  mounted() {
    this.loadMessages();
    this.checkTypingMessage();
    this.checkFinishTypingMessage();
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.im {
    display: flex;
    height: 'calc(100vh - %s)' % header-height;
}

.im__dialogs {
    width: 100%;
    max-width: 39.13%;
    overflow-y: auto;
    max-height: 100%;
    height: 100%;
    background-color: #F2F5F9;

    @media (max-width: breakpoint-xl) {
        max-width: 120px;
    }
}

.im__chat {
    width: 100%;
    flex: auto;
    height: 100%;
    background-color: #F8FAFD;
}
</style>
