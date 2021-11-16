<template lang="pug">
  .main-layout
    main-layout-sidebar
    .main-layout__main
      main-layout-header
      main.main-layout__page
        router-view
    real-time-updater
    notifications-messages(:openChat='openChat'  @updateOpenChat="openChat = $event")
    .mini-chat(v-if='openAllChats.length > 0')
      mini-chat(v-for='item in openAllChats' :key='item' :chatID='item')
</template>

<script>
import MainLayoutHeader from '@/components/MainLayout/Header'
import MainLayoutSidebar from '@/components/MainLayout/Sidebar'
import RealTimeUpdater from '@/components/RealTimeUpdater'
import NotificationsMessages from '../components/Im/NotificationsMessages'
import { mapActions } from 'vuex'
import MiniChat from '../components/Im/MiniChat'
export default {
  components: {
    MiniChat,
    NotificationsMessages,
    MainLayoutHeader,
    MainLayoutSidebar,
    RealTimeUpdater
  },
  data: () => ({
    openChat:[],
  }),
  methods:{
    ...mapActions('profile/dialogs', [
      'checkUnreadCount',
      'apiLoadAllDialogs',
      'loadMessages',
      'checkTypingMessage',
      'checkFinishTypingMessage',])
  },
  computed:{
    openAllChats(){
      return this.openChat = this.openChat.filter((thing, index, self) =>
          index === self.findIndex((t) => (
            t.place === thing.place
          ))
      )
    }
  },
  mounted() {
    this.checkUnreadCount();
    this.apiLoadAllDialogs();
    this.loadMessages();
    this.checkTypingMessage();
    this.checkFinishTypingMessage();
  }
}
</script>

<style lang="stylus">
@import '../assets/stylus/base/vars.styl';

.main-layout {
  display: flex;
  height: 100%;
}

.main-layout__main {
  width: 100%;
  margin-left: sidebar-width;
  height: 100%;

  @media (max-width: breakpoint-xxl) {
    margin-left: sidebar-width-xl;
  }
}

.main-layout__page {
  padding-top: header-height;
  background-color: white-lilac;
  min-height: 100%;
  position: relative;
  z-index: 1;
}
</style>
