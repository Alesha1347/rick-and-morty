<template>
  <div class="wrapper">
    <div class="params">
      <div class="range__episodes">
        <h2 class="range__name">Эпизоды:</h2>
          <MyRangeSlider
        :lastLocation.sync="lastEpisodes"
        :firstLocation.sync="firstEpisodes"
        :minLocation="1"
        :maxLocation="this.MAX_EPISODES"
        @sliderOne="CHANGE_FIRST_EPISODES"
        @sliderTwo="CHANGE_LAST_EPISODES"
        />
      </div>
        <MySearch
        @searchCharacters="SEARCH_TERM"
        />
    </div>
    <div class="title title__episodes">
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
        v-if="this.NUM_EPISODES.length == 0"
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
      lastEpisodes: 51
    }
  },
  computed:{
    ...mapGetters({
      EPISODES: 'episodes/EPISODES',
      COUNTS: 'episodes/COUNTS',
      LOADED: 'episodes/LOADED',
      MAX_EPISODES: 'episodes/MAX_EPISODES',
      SEARCH: 'episodes/SEARCH',
      NUM_EPISODES: 'episodes/NUM_EPISODES'
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
  },
  watch:{
    'SEARCH': function(){
      this.currentPage = 1
      this.$router.push({name: 'episodes', query:{
        search: this.SEARCH
      }})
    },
        'currentPage': function(){
      this.$router.push({name: 'episodes', query:{
        ...this.$route.query,
          page: this.currentPage,
      }})
    }
  }
}
</script>

<style>
.range__episodes {
  display: flex;
  flex-direction: column;
}
.range__name {
  color: white;
  font-size: 20px;
}
.episodes {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  justify-content: center;
  position: relative;
}
.title__episodes{
 margin-top: -30px;
}
.episodes__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>