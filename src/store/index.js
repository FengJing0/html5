import Vue from 'vue'
import Vuex from 'vuex'

import menu from './modules/menu'
import FullScreen from './modules/FullScreen'
import SetUpData from './modules/SetUpData'
import Status from './modules/Status'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menu,
    FullScreen,
    SetUpData,
    Status
  }
})
