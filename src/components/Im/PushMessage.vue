<template lang='pug'>
transition-group.push(v-if='getNewMessage.length > 0' name="item" tag='ul' )
  li.push__item(v-for='message in getNewMessage' :key='message.id')
    .push__header
      p.push__title Новое сообщение:
      button.push__btn-close(@click='closeMessage(message.id)')
    .push__container
      img.push__img(:src='message.recipient.photo' :alt='message.recipient.first_name')
      p.push__name {{message.recipient.first_name}} {{message.recipient.last_name}}
      p.push__message {{message.message_text}}
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'pushMessage',
  data: () => ({

  }),
  computed: {
    ...mapGetters('profile/dialogs', ['getNewMessage']),
  },
  methods:{
    ...mapMutations('profile/dialogs', ['removeNewMessage']),

    closeMessage(itemId){
      const messages = this.getNewMessage.filter(el => el.id !== itemId)
      this.removeNewMessage(messages)
    }
  },
  // watch: {
  //   getNewMessage: function (){
  //     this.getNewMessage.forEach(el=>{
  //       setTimeout(()=>{
  //         this.closeMessage(el.id)
  //       },15000)
  //     })
  //   }
  // }
}
</script>

<style scoped lang="stylus">
.push{
  position: fixed;

  display flex
  flex-direction column
  justify-content flex-end

  bottom: 20px;
  right: 20px;

  width: 300px;
  max-height: 70vh;

  background: transparent;

  z-index: 100;

  transform height 0.3s

  &__item{
    display flex
    flex-direction column

    width 100%
    margin 0

    background white
    border-radius 15px
    box-shadow: 0px 2px 8px rgb(0 0 0 / 8%);
    padding 15px
    height 111px

    overflow hidden
  }

  &__header{
    display flex
    width 100%
    justify-content space-between
    align-items center
    margin-bottom 15px
  }

  &__title{
    width 100%
    text-align left
  }

  &__btn-close{
    outline none
    border none
    cursor: pointer;
    display block

    position relative
    width 15px
    height 15px
    background transparent

    transition transform 0.3s
    &:after,
    &:before{
        content ''
        display block
        width 1px
        height 100%
        background black
        position absolute
        top 50%
        left 50%
        transition background 0.3s
      }


    &:before{
      transform translate(-50%, -50%) rotate(-45deg)
    }
    &:after{
      transform translate(-50%, -50%) rotate(45deg)
    }

    &:hover,
    &:focus{
      &:after,
      &:before{
        background  red
        transition background 0.3s
      }

    }

    &:active{
      transform scale(0.7)
      transition transform 0.3s
    }

  }

  &__container{
    display grid;
    grid-template-areas "img name" "img message";
    grid-template-rows repeat(2, auto)
    grid-template-columns 50px 1fr
    grid-column-gap 5px
    grid-row-gap 15px
    width 100%
  }

  &__img{
    grid-area: img;
    width: 100%;
    height: auto;
    margin 0
  }

  &__name{
    grid-area: name;
    text-align right
  }

  &__message{
    grid-area: message;
    display inline-block
    text-align right
    overflow hidden
    white-space: nowrap;
    text-overflow ellipsis
  }
}


.item-enter-active,
.item-leave-active {
  transition: height 0.5s;
}
.item-enter,
.item-leave-to {
  height: 0;
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
  border: 0;
}
</style>
