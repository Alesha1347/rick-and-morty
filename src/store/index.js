import Vue from 'vue'
import Vuex from 'vuex'
import characters from './modules/characters'
import locations from './modules/locations'
import episodes from './modules/episodes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    characters: characters,
    locations: locations,
    episodes: episodes
  }
})
