import Vue from 'vue'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import VueSimpleSVG from 'vue-simple-svg'
Vue.use(VueSimpleSVG)
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)
import VCalendar from 'v-calendar'
Vue.use(VCalendar)
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const moment = require('moment')
moment.locale('ru')
import VueMoment from 'vue-moment'
Vue.use(VueMoment, {
  moment
})
