<template>
  <div class="wrapper">
        <div class="params">
          <MySelect
        :categories="statusOptions"
        @chooseSelect="CHANGE_DIMENSION"
        :selected="selected"
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
      selected: 'Выберите измерение',
      statusOptions:[
        {name: 'Все', value:'All'},
        {name: 'Dimension C-137', value:'Dimension C-137'},
        {name: 'Unknown', value:'unknown'},
        {name: 'Replacement Dimension', value:'Replacement Dimension'},
        {name: 'Fantasy Dimension', value:'Fantasy Dimension'},
        {name: 'Dimension 5-126', value:'Dimension 5-126'},
        {name: 'Testicle Monster Dimension', value:'Testicle Monster Dimension'},
        {name: 'Cromulon Dimension', value:'Cromulon Dimension'},
        {name: 'Dimension C-500A', value:'Dimension C-500A'},
        {name: 'Dimension K-83', value:'Dimension K-83'},
        {name: 'Dimension J19ζ7', value:'Dimension J19ζ7'},
        {name: 'Eric Stoltz Mask Dimension', value:'Eric Stoltz Mask Dimension'},
        {name: 'Pizza Dimension', value:'Pizza Dimension'},
      ]
    }
  },
  computed:{
    ...mapGetters({
      LOCATIONS: 'locations/LOCATIONS',
      COUNTS: 'locations/COUNTS',
      LOADED: 'locations/LOADED',
      SEARCH: 'locations/SEARCH',
      DIMENSION: 'locations/DIMENSION'
    })
  },
  methods:{
    ...mapActions({
      GET_LOCATIONS_FROM_API: 'locations/GET_LOCATIONS_FROM_API',
      CHANGE_PAGE: 'locations/CHANGE_PAGE',
      SEARCH_TERM: 'locations/SEARCH_TERM',
      CHANGE_DIMENSION: 'locations/CHANGE_DIMENSION'
    })
  },
  mounted(){
    this.GET_LOCATIONS_FROM_API()
  },
watch:{
    'DIMENSION': function(){
      this.currentPage = 1
      this.statusOptions.forEach(item =>{
        if(item.value === this.DIMENSION){
          this.selected = item.name
          this.$router.push({name: 'locations', query:{
                status: this.DIMENSION
          }})
        }
      })
    },
    'SEARCH': function(){
      this.currentPage = 1
      this.$router.push({name: 'locations', query:{
        search: this.SEARCH
      }})
    },
        'currentPage': function(){
      this.$router.push({name: 'locations', query:{
        ...this.$route.query,
          page: this.currentPage,
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
  position: relative;
}
.location__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>