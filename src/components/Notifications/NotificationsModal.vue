<template lang='pug'>
.modal-n
  .modal-n__close(@click='closeModal')
  .modal-n__wrapper(v-if='this.getFeeds[0]')
    news-block(
      edit,
      deleted,
      :info='this.getFeeds[0]'
      :commentOpen='true'
    )
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import NewsBlock from '@/components/News/Block';

export default {
  name: 'NotificationsModal',
  components: {NewsBlock},
  data: () => ({

  }),
  computed:{
    ...mapGetters('profile/notifications', ['getOpenModal', 'getFeeds']),
  },
  methods:{
    ...mapActions('profile/notifications', ['addPostById']),
    ...mapMutations('profile/notifications', ['setOpenModal', 'removeFeeds']),
    closeModal(){
      this.setOpenModal(null);
      this.removeFeeds([]);
    },
  },
  mounted() {
    const postId = this.getOpenModal[0].parent_entity_id
    this.addPostById(postId);

    if(this.getOpenModal[0].entity_id){
      const id = '' + this.getOpenModal[0].parent_entity_id + '-' + this.getOpenModal[0].entity_id;
      const el = document.getElementById(id);
      setTimeout(()=>{
        console.log(el)
        if(el) el.scrollIntoView({behavior: "smooth"});
      },1000)
    }
  }

}
</script>


<style scoped lang='stylus'>

.modal-n{
  position fixed
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1060;
  &__close{
      position absolute
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background black
      opacity 0.7
      transition opacity 0.3s

      &:hover{
        opacity 0.5
        cursor pointer !important
        transition opacity 0.3s
      }
  }

  &__wrapper{
    position absolute
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background white;
    z-index: 1065;

    padding 25px;
    max-height 80vh;
    overflow-y auto
  }
}
</style>
