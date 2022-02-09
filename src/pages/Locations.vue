<template>
  <div class="wrapper">
        <div class="params">
          <MyRangeSlider
          :firstLocation.sync="firstLocation"
          :lastLocation.sync="lastLocation"
          :minLocation="1"
          :maxLocation="this.MAX_LOCATION"
          @sliderOne="CHANGE_FIRST_LOCATION"
          @sliderTwo="CHANGE_LAST_LOCATION"
          />
        <MySearch
        @searchCharacters="SEARCH_TERM"
        />
    </div>
        <div class="title">
            <h1>Локации мультсериала Рик и Морти</h1>
        </div>
    <div class="locations">
        <MySpinner v-if="this.LOADED"/>
      <h1>{{this.FIRST_LOCATION}} - {{this.LAST_LOCATION}}</h1>
      <div class="location__content">
      <LocationsList
      v-for="location in LOCATIONS"
      :key="location.id"
      :location="location"
      />
        </div>
      <div class="location__footer">
        <MyPaginate
        :counts="COUNTS"
        @changePage="CHANGE_PAGE"
        :currentPage.sync="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LocationsList from '../components/locations/locationsList.vue'

export default {
  components:{LocationsList},
  data(){
    return{
      currentPage: 1,
      firstLocation: this.$store.state.locations.firstLocation,
      lastLocation: this.$store.state.locations.lastLocation
    }
  },
  computed:{
    ...mapGetters({
      LOCATIONS: 'locations/LOCATIONS',
      COUNTS: 'locations/COUNTS',
      FIRST_LOCATION: 'locations/FIRST_LOCATION',
      LAST_LOCATION: 'locations/LAST_LOCATION',
      MAX_LOCATION: 'locations/MAX_LOCATION',
      LOADED: 'locations/LOADED'
    })
  },
  methods:{
    ...mapActions({
      GET_LOCATIONS_FROM_API: 'locations/GET_LOCATIONS_FROM_API',
      CHANGE_PAGE: 'locations/CHANGE_PAGE',
      CHANGE_FIRST_LOCATION: 'locations/CHANGE_FIRST_LOCATION',
      CHANGE_LAST_LOCATION: 'locations/CHANGE_LAST_LOCATION',
      SEARCH_TERM: 'locations/SEARCH_TERM'
    })
  },
  mounted(){
    this.GET_LOCATIONS_FROM_API()
  },
  // watch:{
  //   'currentPage': function(){
  //     this.$router.push({name:'locations', query:{
  //       page: this.currentPage
  //     }})
  //   }
  // }
}
</script>

<style>
.locations {
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.location__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>