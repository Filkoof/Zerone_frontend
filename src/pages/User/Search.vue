<template lang="pug">
  .search
    .search__tabs
      search-tabs
      component(:is="`search-filter-${tabSelect}`")
    .search__main
      component(:is="`search-${tabSelect}`")
      is-loading(v-if="getData.total> getData.offset", :isLoad='getData.status', v-load="loadData")
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SearchTabs from '@/components/Search/Tabs'
import SearchUsers from '@/components/Search/Users'
import SearchNews from '@/components/Search/News'
import SearchFilterUsers from '@/components/Search/Filter/Users'
import SearchFilterNews from '@/components/Search/Filter/News'
import isLoading from '@/components/isLoading'
export default {
  name: 'Search',
  components: { SearchTabs, SearchUsers, SearchNews, SearchFilterUsers, SearchFilterNews, isLoading },
  data: () => ({
    hasSearchText: true
  }),
  computed: {
    ...mapGetters('global/search', [
      'searchText',
      'tabSelect',
      'getTotalUsers',
      'getLoadUsers',
      'getOffsetUsers',
      'getTotalNews',
      'getLoadNews',
      'getOffsetNews'
    ]),

    getData() {
      if (this.tabSelect == 'users') {
        return {
          total: this.getTotalUsers,
          offset: this.getOffsetUsers,
          status: this.getLoadUsers
        }
      } else {
        return {
          total: this.getTotalNews,
          offset: this.getOffsetNews,
          status: this.getLoadNews
        }
      }
    }
  },
  watch: {
    searchText() {
      this.routePushWithQuery(this.tabSelect)
    }
  },
  methods: {
    ...mapMutations('global/search', ['setTabSelect', 'routePushWithQuery', 'setLoadUsers', 'setloadNews']),
    ...mapActions('global/search', ['clearSearch']),
    loadData() {
      if (this.tabSelect == 'users') {
        this.setLoadUsers(true)
      } else {
        this.setloadNews(true)
      }
    }
  },
  beforeDestroy() {
    this.clearSearch()
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.search__tabs {
  background: #fff;
  box-shadow: standart-boxshadow;
  position: fixed;
  top: header-height;
  left: sidebar-width;
  right: 0;
  padding: 0 20px;
  z-index: 10;

  @media (max-width: breakpoint-xxl) {
    left: sidebar-width-xl;
  }
}

.search__main {
  padding: 100px 40px 50px;
  height: 100%;
  overflow-y: auto;
  padding-top: 250px;

}
</style>
