<template lang="pug">
  .news.inner-page
    .inner-page__main
      .news__add
        news-add(user)
      .news__list(v-if="getInfo")
        news-block(
          v-for="feed in getFeeds" 
          :key="feed.id"
          :info="feed" 
          :edit="getInfo.id === feed.author_id" 
          :deleted="getInfo.id === feed.author_id"
        )
      div.load-block(ref="observer")
    .inner-page__aside
      friends-request
      br
      friends-possible
  
 </template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FriendsPossible from '@/components/Friends/Possible'
import FriendsRequest from '@/components/Friends/Request'
import NewsBlock from '@/components/News/Block'
import NewsAdd from '@/components/News/Add'
export default {
    name: 'News',
    components: { FriendsPossible, FriendsRequest, NewsBlock, NewsAdd },
    data: () => ({
        offset: 0,
        itemPerPage: 5,
    }),
    computed: {
        ...mapGetters('profile/feeds', ['getFeeds']),
        ...mapGetters('profile/info', ['getInfo']),
    },
    methods: {
        ...mapActions('profile/feeds', ['apiFeeds']),
    },
    mounted() {
        this.apiFeeds({ offset: this.offset, itemPerPage: this.itemPerPage })

        const options = {
            rootMargin: '0px',
            threshold: 1.0,
        }
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting) {
                this.offset = this.offset + this.itemPerPage

                this.apiFeeds({ offset: this.offset, itemPerPage: this.itemPerPage })
            }
        }
        const observer = new IntersectionObserver(callback, options)
        observer.observe(this.$refs.observer)
    },
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.news__add {
    margin-bottom: 30px;
}

.load-block {
    display: block;
    width: 100%;
    height: 10px;
    position: relative;
    z-index: -1;
}
</style>
