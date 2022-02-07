<template>
  <div class="wrapper">
        <div class="params">
          <MyRangeSlider
          :lastLocation.sync="lastLocation"
          :firstLocation.sync="firstLocation"
          :minLocation="1"
          :maxLocation="this.MAX_LOCATION"
          @sliderOne="CHANGE_FIRTST_LOCATION"
          @sliderTwo="CHANGE_LAST_LOCATION"
          />
        <MySearch
        />
    </div>
        <div class="title">
            <h1>Локации мультсериала Рик и Морти</h1>
        </div>
    <div class="locations">
      <h1>{{this.FIRST_LOCATION}} - {{this.LAST_LOCATION}}</h1>
      <div class="location__content">
      <LocationsList
      v-for="location in LOCATIONS"
      :key="location.id"
      :location="location"
      />
        </div>
      <div class="location__footer">
        <Paginate
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
import Paginate from '../components/UI/Paginate.vue'

export default {
  components:{LocationsList, Paginate},
  data(){
    return{
      currentPage: 1,
      firstLocation: 1,
      lastLocation: 126
    }
  },
  computed:{
    ...mapGetters({
      LOCATIONS: 'locations/LOCATIONS',
      COUNTS: 'locations/COUNTS',
      FIRST_LOCATION: 'locations/FIRST_LOCATION',
      LAST_LOCATION: 'locations/LAST_LOCATION',
      MAX_LOCATION: 'locations/MAX_LOCATION'
    })
  },
  methods:{
    ...mapActions({
      GET_LOCATIONS_FROM_API: 'locations/GET_LOCATIONS_FROM_API',
      CHANGE_PAGE: 'locations/CHANGE_PAGE',
      CHANGE_FIRTST_LOCATION: 'locations/CHANGE_FIRTST_LOCATION',
      CHANGE_LAST_LOCATION: 'locations/CHANGE_LAST_LOCATION'
    })
  },
  mounted(){
    this.GET_LOCATIONS_FROM_API()
  },
  watch:{
    'currentPage': function(){
      this.$router.push({name:'locations', query:{
        page: this.currentPage
      }})
    }
  }
}
</script>

<style>
.locations {
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.location__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>