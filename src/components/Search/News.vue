<template lang="pug">
.search-news
    search-block#news(title='Новости')
        news-block(v-for='n in news', :key='news.id', :info='n')
</template>

<script>
import SearchBlock from '@/components/Search/Block'
import NewsBlock from '@/components/News/Block'
import { mapGetters } from 'vuex'
export default {
    name: 'SearchNews',
    components: { SearchBlock, NewsBlock },
    computed: {
        ...mapGetters('global/search', ['getResultById']),
        news() {
            return this.getResultById('news')
        },
    },
}
</script>
