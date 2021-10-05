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
            select.select.search-filter__select(v-model.number='age_from')
                option(value='null', disabled) От
                option(value='31') От 31
                option(value='32') От 32
                option(value='33') От 33
            span.search__age-defis —
            select.select.search-filter__select(v-model.number='age_to')
                option(value='null', disabled) До
                option(value='34') До 34
                option(value='35') До 35
                option(value='36') До 36
    .search-filter__block.region
        label.search__label Регион:
        .search__row
            select.select.search-filter__select(v-model='country')
                option(value='null') Страна
                option(v-for='country in getCountries', :key='country.id') {{ country.title }}

            select.select.search-filter__select(v-model='city')
                option(value='null') Город
                option(v-for='city in getCityFilter', :key='city.countryId') {{ city.country }}
    .search-filter__block.btn-news(@click.prevent='onSearchUsers')
        button-hover Применить
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'SearchFilterUsers',
    data: () => ({
        first_name: null,
        last_name: null,
        age_from: null,
        age_to: null,
        country: null,
        city: null,
        offset: 0,
        itemPerPage: 20,
    }),
    computed: {
        ...mapGetters('profile/country_city', ['getCountries', 'getCities']),
        getCityFilter() {
            if (!this.country || this.country === 'null') {
                return this.getCities
            } else {
                return this.getCities.filter((el) => el.city === this.country)
            }
        },
    },
    methods: {
        ...mapActions('global/search', ['searchUsers']),
        ...mapActions('profile/country_city', ['apiCountries', 'apiAllCities']),
        onSearchUsers() {
            let { first_name, last_name, age_from, age_to, country, city } = this
            this.searchUsers({ first_name, last_name, age_from, age_to, country, city })
        },
    },
    created() {
        this.apiCountries()
        this.apiAllCities()
    },
    watch: {
        city(value) {
            if (!value || value === 'null') return
            const countryId = this.getCities.find((el) => el.country === value).cityId
            this.country = this.getCountries.find((el) => el.id === countryId).title
        },
    },
}
</script>
