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
          :edit="getInfo.id === feed.author.id" 
          :deleted="getInfo.id === feed.author.id"
        )
      div.load-block(ref="observer")
        div.load-anial-container(v-if="isLoad")
          span.load-anial-icon
          span.load-anial-icon
          span.load-anial-icon
    .inner-page__aside
      friends-request
      br
      friends-possible
  
 </template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
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
        isLoad: false,
    }),
    computed: {
        ...mapGetters('profile/feeds', ['getFeeds']),
        ...mapGetters('profile/info', ['getInfo']),
    },
    methods: {
        ...mapActions('profile/feeds', ['apiFeeds']),
        ...mapMutations('profile/feeds', ['setFeeds']),
    },
    mounted() {
        this.isLoad = true
        this.setFeeds([])
        this.apiFeeds({ offset: this.offset, itemPerPage: this.itemPerPage }).then(() => {
            this.isLoad = false
        })

        const options = {
            rootMargin: '0px',
            threshold: 1.0,
        }

        const callback = (entries, observer) => {
            if (entries[0].isIntersecting) {
                this.isLoad = true
                this.offset = this.offset + this.itemPerPage

                this.apiFeeds({ offset: this.offset, itemPerPage: this.itemPerPage }).then(() => {
                    this.isLoad = false
                })
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

.load-anial-container {
    margin-top: 15px;
    display: grid;
    grid-template-columns: repeat(3, 20px);
    grid-column-gap: 5px;
}

.load-anial-icon {
    display: block;
    height: 8px;
    background-color: #21a45d;
    opacity: 0.3;
    transition: opacity 0.3s;
    border-radius: 2px;
    animation-name: loadAnimations;
    animation-duration: 1.6s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    &:nth-child(1) {
        -webkit-animation-delay: 0.4s;
    }

    &:nth-child(2) {
        -webkit-animation-delay: 0.8s;
    }

    &:nth-child(3) {
        -webkit-animation-delay: 1.2s;
    }
}

@keyframes loadAnimations {
    0% {
        opacity: 0.3;
        transition: opacity 0.3s;
    }

    70% {
        opacity: 1;
        transition: opacity 0.3s;
    }
}
</style>
