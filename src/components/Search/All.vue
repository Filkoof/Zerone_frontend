<template lang="pug">
.search-all
    h2 НИКИТА ПЕРЕПОДНИМИ КОНТЕЙНЕРЫ !
    search-block#users(title='Люди', all)
        .friends__list
            friends-block(v-for='user in users', :key='user.id', :info='user')
    search-block#news(title='Новости', all)
        news-block(v-for='n in news', :key='n.id', :info='n')
</template>

<script>
import { mapGetters } from 'vuex'
import SearchBlock from '@/components/Search/Block'
import FriendsBlock from '@/components/Friends/Block'
import NewsBlock from '@/components/News/Block'
export default {
    name: 'SearchAll',
    components: { SearchBlock, FriendsBlock, NewsBlock },
    computed: {
        ...mapGetters('global/search', ['getResultById']),
        news() {
            return this.getResultById('news')
        },
        users() {
            return this.getResultById('users')
        },
    },
}
</script>
