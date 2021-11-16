<template lang='pug'>
.chat
  .chat__header
    img.chat__img
    p.chat__name
    button.chat__btn-close
  .chat__main
  .chat__footer
</template>



<script>

  import { mapGetters } from 'vuex'

  export default {
  name: 'miniChat',
  props: {
    chatID:{
      type: Number
    }
  },
  data: () => ({

  }),
    computed:{
    ...mapGetters('profile/dialogs', ['getDialogs']),
      messages(){
        return this.getDialogs.filter(i => i.id == this.chatID)
      }
    },

  }

</script>

<style scoped lang='stylus'>
.chat{
  position absolute
  top 90vh
  right 20px
  transform translate(-50%, -50%)
  z-index 200
  width 150px
  height 80px
  background grey
}
</style>
