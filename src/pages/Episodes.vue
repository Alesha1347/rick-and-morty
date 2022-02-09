<template>
  <div class="wrapper">
    <div class="params">
          <MyRangeSlider
        :lastLocation.sync="lastEpisodes"
        :firstLocation.sync="firstEpisodes"
        :minLocation="1"
        :maxLocation="this.MAX_EPISODES"
        @sliderOne="CHANGE_FIRST_EPISODES"
        @sliderTwo="CHANGE_LAST_EPISODES"
        />
        <MySearch
        @searchCharacters="SEARCH_TERM"
        />
    </div>
    <div class="title">
      <h1>Эпизоды мультсериала Рик и Морти</h1>
    </div>
      <div class="episodes">
        <MySpinner v-if="this.LOADED"/>
      <div class="episodes__content">
        <EpisodesList
        v-for="episodes in EPISODES"
        :key="episodes.id"
        :episodes="episodes"
        />
      </div>
      <div class="episodes__footer">
        <MyPaginate
        @changePage="CHANGE_PAGE"
        :counts="COUNTS"
        :currentPage.sync="currentPage"
        />
      </div>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EpisodesList from '../components/episodes/EpisodesList.vue'

export default {
  components:{EpisodesList},
  data(){
    return{
      currentPage: 1,
      firstEpisodes: 1,
      lastEpisodes: 126
    }
  },
  computed:{
    ...mapGetters({
      EPISODES: 'episodes/EPISODES',
      COUNTS: 'episodes/COUNTS',
      LOADED: 'episodes/LOADED',
      MAX_EPISODES: 'episodes/MAX_EPISODES'
    })
  },
  methods:{
    ...mapActions({
      GET_EPISODES_FROM_API: 'episodes/GET_EPISODES_FROM_API',
      CHANGE_PAGE: 'episodes/CHANGE_PAGE',
      SEARCH_TERM: 'episodes/SEARCH_TERM',
      CHANGE_FIRST_EPISODES: 'episodes/CHANGE_FIRST_EPISODES',
      CHANGE_LAST_EPISODES: 'episodes/CHANGE_LAST_EPISODES'
    })
  },
  mounted(){
    this.GET_EPISODES_FROM_API()
  }
}
</script>

<style>
.episodes {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  justify-content: center;
  position: relative;
}
.episodes__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>