<template lang="pug">
.search-filter
    .search-filter__block.name
        label.search__label(for='search-people-name') Имя:
        input#search-people-name.search__input(type='text', v-model='first_name')
    .search-filter__block.lastname
        label.search__label(for='search-people-lastname') Фамилия:
        input#search-people-lastname.search__input(type='text', v-model='last_name')
    .search-filter__block.age
        label.search__label Возраст:
        .search__row
            input#search-age-from.search__input.search__input_age(type='number', placeholder="От" v-model.number='age_from')
            span.search__age-defis —
            input#search-age-to.search__input.search__input_age(type='number', placeholder="До" v-model.number='age_to')
    .search-filter__block.region
        label.search__label Регион:
        .search__row
            select-location.search-filter__select(
              v-model="country",
              placeholder='Страна',
              :options-list="countries"
              @selectOoption="setCountry"
            )

            select-location.search-filter__select(
              v-model="city",
              placeholder='Город',
              :options-list="cities"
              @selectOoption="setCity"
            )
    .search-filter__block.btn-news(@click.prevent='clerAndSearchUser')
        button-hover Применить
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import SelectLocation from '@/components/FormElements/SelectLocation.vue'

export default {
  name: 'SearchFilterUsers',
  components: { SelectLocation },
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
    ...mapGetters('profile/country_city', ['getCountries', 'getCities']),
    countries() {
      return this.getCountries.data || [];
    },
    cities() {
      return this.getCities.data || [];
    },
    selectedCountryId() {
      const country = this.countries.find(
        (item) => item.title.toUpperCase() === this.country.toUpperCase()
      )
      return country ? country.id : 0;
    },
    getCityFilter() {
      if (!this.country || this.country === 'null') {
        return this.getCities
      } else {
        return this.getCities.filter(el => el.city === this.country)
      }
    }
  },

  created() {
    this.apiCountries()
    this.apiCities({ countryId: 1 })
  },
  beforeDestroy() {
    this.clearSearchUsers()
    this.clearAndSerchUser()
  },
  watch: {
    country(newVal) {
      this.apiCountries({ country: newVal });
      this.apiCities({ countryId: this.selectedCountryId });
    },
    city(newVal) {
      this.apiCities({
        countryId: this.selectedCountryId,
        city: newVal,
      });
    }
  },
  methods: {
    ...mapActions('global/search', ['searchUsers']),
    ...mapMutations('global/search', ['setOffsetUsers']),
    ...mapActions('profile/country_city', ['apiCountries', 'apiCities', 'clearSearchUsers']),
    onSearchUsers() {
      let { first_name, last_name, age_from, age_to, country, city } = this

      this.searchUsers({ first_name, last_name, age_from, age_to, country, city })
        .then(() => {
          this.offset += this.itemPerPage
        })
        .then(() => {
          this.setOffsetUsers(this.offset)
        })
    },
    clerAndSearchUser() {
      this.offset = 0
      this.setOffsetUsers(this.offset)
      setTimeout(() => {
        this.onSearchUsers()
      }, 0)
    },
    setCountry(countryData) {
      this.country = countryData.title;
    },
    setCity(value) {
      this.city = value.title
    }
  },
}
</script>


<style lang="stylus">
.search-filter {
  flex-wrap: wrap;
  &__block {
    flex: 0 0 50%;
    max-width: 300px;
  }
  &__block.age {
    max-width: 300px;
  }
  &__block.region {
    flex: 0 0 auto;
    max-width: 100%;
    width: auto;
    margin-top 10px;
    margin-left 0;

    .search-filter__select {
      max-width: 300px;
      width: 300px;

      &:first-child {
        margin-right 20px;
      }

      .select-location__input {
        border-color: #cbcbcb;
      }
    }
  }
}
</style>
