<template lang="pug">
  form.friends-possible(@submit.prevent="onSearchUsers" action="#")
    h4.friends-possible__title Параметры поиска
    .friends-search
      .friends-search__row
        .friends-search__block
          label.search__label(for="friends-search-name") Имя:
          input.search__input(type="text" id="friends-search-name" v-model="first_name")
        .friends-search__block
          label.search__label(for="friends-search-lastname") Фамилия:
          input.search__input(type="text" id="friends-search-lastname" v-model="last_name")
      .friends-search__block
        label.search__label Возраст:
        .search__row
          select.select.friends-search__select(v-model.number="age_from")
            option(value="null" disabled) От
            option(value="31") От 31
            option(value="32") От 32
            option(value="33") От 33
          span.search__age-defis —
          select.select.friends-search__select(v-model.number="age_to")
            option(value="null" disabled) До
            option(value="34") До 34
            option(value="35") До 35
            option(value="36") До 36
      .friends-search__block
        label.search__label Регион:
        .search__row
          select.select.friends-search__select(v-model="country")
            option(value="null") Страна
            option(v-for="country in getCountries" :key="country.id") {{ country.title }}
          select.select.friends-search__select(v-model="city")
            option(value="null") Город
            option(v-for="city in getCityFilter" :key="city.countryId") {{ city.country }}
    button.friends-possible__btn(type="submit")
      simple-svg(:filepath="'/static/img/search.svg'")
      span.friends-possible__link Искать друзей
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SelectLocation from '@/components/FormElements/SelectLocation.vue'
export default {
  name: 'FriendsSearch',
  data: () => ({
    first_name: null,
    last_name: null,
    age_from: null,
    age_to: null,
    country: null,
    city: null,
    offset: 0,
    itemPerPage: 10
  }),
  computed: {
    ...mapGetters('profile/country_city', ['getCountries', 'getCities', 'getLoadUsers']),
    getCityFilter() {
      if (!this.country || this.country === 'null') {
        return this.getCities
      } else {
        return this.getCities.filter(el => el.city === this.country)
      }
    }
  },
  methods: {
    ...mapActions('global/search', ['searchUsers', 'clearSearchUsers', 'clearSearchNews']),
    ...mapActions('profile/country_city', ['apiCountries']),
    onSearchUsers() {
      let { first_name, last_name, age_from, age_to, country, city, offset, itemPerPage } = this
      this.searchUsers({ first_name, last_name, age_from, age_to, country, city, offset, itemPerPage }).then(() => {
        //this.offset += this.itemPerPage
      })
    },
    clearSearch() {
      this.clearSearchUsers()
      this.clearSearchNews()
    }
  },
  created() {
    this.apiCountries()
  },
  watch: {
    getLoadUsers: function(val) {
      if (val) {
        this.onSearchUsers()
      }
    },
    city(value) {
      if (!value || value === 'null') return
      const countryId = this.getCities.find(el => el.country === value).cityId
      this.country = this.getCountries.find(el => el.id === countryId).title
    }
  },
  beforeDestroy() {
    this.clearSearch()
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.friends-search {
  margin-top: 25px;
  padding-top: 20px;
  margin-bottom: 30px;
  border-top: 1px solid #E6E6E6;
}

.friends-search__row {
  @media (max-width: breakpoint-xl) {
    display: flex;

    .friends-search__block {
      flex: auto;
    }

    .friends-search__block + .friends-search__block {
      margin-top: 0;
      margin-left: 12px;
    }
  }
}

.friends-search__row + .friends-search__block {
  margin-top: 15px;
}

.friends-search__block {
  &+& {
    margin-top: 15px;
  }
}

.friends-search__select {
  display: block;
  width: 100%;

  &+& {
    margin-left: 12px;
  }
}
</style>
