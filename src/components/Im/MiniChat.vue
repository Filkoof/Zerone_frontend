<template lang='pug'>
  VueDragResize.chat(:isActive="dragFunctions.isActive" :minw='minW' :w='minW' :h='minH' :minh='minH' :isDraggable="dragFunctions.isDragon" :isResizable="dragFunctions.isResize" @resizing="dragFunctions.resize" @dragging="dragFunctions.dragon" :y='y' :x="x" :z='100')
    .chat__dragging-block(@mousedown='dragTrue' @mouseup='dragFalse')
    .chat__wraper
      .chat__header
        router-link.chat__link-img(:to="{name: 'ProfileId', params: {id: messages[0].recipient_id.id}}")
          img.chat__img(v-if='messages[0].recipient_id.photo' :src='messages[0].recipient_id.photo' :alt='messages[0].recipient_id.first_name')
          img.chat__img(v-else src='../../../static/img/user/default_avatar.svg' :alt='messages[0].recipient_id.first_name')
        .chat__info-container
          p.chat__name {{messages[0].recipient_id.first_name}} {{messages[0].recipient_id.last_name}}
          span.user-status(:class="{online: checkOnlineUser(messages[0].recipient_id.last_online_time)}") {{statusText}}
        button.chat__btn-close(@click='closeChat')
      .chat__main
      form.chat__footer
        input.chat__input(@click='focus')
        button.chat__btn
    .chat__dragging-bottom-block(@mousedown='dragResizeTrue' @mouseup='dragResizeFalse')
      .span
</template>



<script>
  import { mapGetters } from 'vuex'
  import VueDragResize from 'vue-drag-resize'
  import moment from 'moment'

  export default {
    name: 'miniChat',
    components: {
      VueDragResize
    },
    props: {
      chatID:{
        type: Number
      },
      close:{
        type: Function
      }
    },
    data: () => ({
      x: 50,
      y: 50,
      minW: 300,
      minH: 350,
      dragStatus: false,
      resizeStatus: false,
    }),
      computed:{
      ...mapGetters('profile/dialogs', ['getDialogs']),
        messages(){
          return this.getDialogs.filter(i => i.id == this.chatID)
        },
        statusText() {
        const time = this.getDialogs[0].recipient_id.last_online_time;
          return this.checkOnlineUser(time)
            ? this.$t('online')
            : this.$t('was') + moment(time).fromNow()
        },

        dragFunctions(){
          if(this.dragStatus){
            return {
              isActive: true,
              isDragon: true,
              isResize: false,
              dragon: this.resize,
              resize: function(){
                return
              }
            }
          }
          if(this.resizeStatus){
            return {
              isActive: true,
              isDragon: false,
              isResize: true,
              dragon: function(){
              return
            },
              resize: this.resize,
            }
          }
          return {
            isActive: false,
            isDragon: false,
            isResize: false,
            dragon: function(){
              return
            },
            resize: function(){
              return
            },
          }
        }
      },
    methods: {
      checkOnlineUser(time) {
        return moment().diff(moment(time), 'seconds') <= 60
      },
      closeChat(){
        this.close(this.chatID)
      },

      resize(newRect) {
        this.width = newRect.width;
        this.height = newRect.height;
        this.top = newRect.top;
        this.left = newRect.left;
      },
      dragTrue(){
        this.dragStatus = true
      },
      dragFalse(){
        this.dragStatus = false
      },
      dragResizeTrue(){
        this.resizeStatus = true
      },
      dragResizeFalse(){
        this.resizeStatus = false
      },
      focus(e){
        e.target.focus()
      }
    },
    i18n: {
      messages: {
        en: {
          nomore: 'No more messages',
          placeholder: 'Your message...',
          online: 'Online',
          was: 'was online '
        },
        ru: {
          nomore: 'Больше сообщений нет',
          placeholder: 'Ваше сообщение...',
          online: 'Онлайн',
          was: 'был в сети '
        }
      }
    }

  }

</script>

<style scoped lang='stylus'>
@import '../../assets/stylus/base/vars.styl';
.chat{
  background white
  border-radius 10px
  overflow hidden

  border 1px solid #f1f3f9
  box-shadow: 0px 2px 8px rgb(0 0 0 / 8%);

  &__dragging-block{
    width 100%
    height 20px
    cursor move
    background #21a45d
  }

  &__wraper{
    position relative
    padding 5px
    display grid
    grid-template-rows 50px 1fr 40px
    grid-row-gap 5px
    height 95%
  }

  &__header{
    display flex
    background #f2f5f9
    padding 5px
    border-radius 5px
  }

  &__img{
    width auto
    height 100%
    border-radius 100%
    margin-right 20px
  }

  &__info-container{
    margin-right auto
  }

  &__name{
    margin-bottom 3px
    font-weight 600
  }

  &__onlie {
    text-align right
    color: #9EA4AD;
  }
    .online {
      color: eucalypt;
    }


  &__btn-close{
    width 20px
    height 20px
    background transparent
    border none
    outline none

    position relative
    cursor pointer

    transition transform 0.3s

    &:before,
    &:after{
      content ''
      width 100%
      height 1px
      display block
      background black
      position absolute
      top 50%
      left 50%

      transition background 0.3s
    }

    &:before{
      transform translate(-50%, -50%) rotate(45deg)
    }

    &:after{
      transform translate(-50%, -50%) rotate(-45deg)
    }

    &:hover:before,
    &:hover:after,
    &:focus:before,
    &:focus:after{
      background red
      transition background 0.3s
    }

    &:active{
      transform scale(0.8)
      transition transform 0.3s
    }
  }


  &__dragging-bottom-block{
    position absolute
    bottom 0
    right 0
    width 15px
    height 15px
    background transparent

    &:after,
    &:before{
      content ''
      position absolute
      display block
      width 100%
      height 1px
      background black
      overflow hidden
    }

    &:after{
      width 100%

      top 40%
      left 40%
      transform translate(-50%, -50%) rotate(-45deg)
    }

    &:before{
      width 60%

      top 60%
      left 60%
      transform translate(-50%, -50%) rotate(-45deg)
    }
  }

  &__main{
    height 100%
    background #f2f5f9
    padding 5px
    border-radius 5px
  }

  &__footer{
    background #f2f5f9
    padding 5px
    border-radius 5px
    position relative
  }

  &__input{
    width 100%
    border-radius 5px
    height 100%
    padding-left 5px
    padding-right 40px
  }

  &__btn{
    position absolute
    top 50%
    right 15px
    transform translateY(-50%) rotate(-90deg)

    width 25px
    height 25px
    background url("../../../static/img/miniChat/btn.png")
    background-position center
    background-size contain
    background-repeat no-repeat
  }
}
</style>
