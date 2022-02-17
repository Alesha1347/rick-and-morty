<template>
  <div class="wrapper">
    <div class="params">
        <MySelect
        :categories="statusOptions"
        @chooseSelect="CHANGE_STATUS"
        :selected="selected"
        />
        <MySearch
        @searchCharacters="SEARCH_TERM"
        />
    </div>
        <div class="title">
            <h1>Персонажи мультсериала Рик и Морти</h1>
        </div>
      <div class="characters">
        <MySpinner v-if="this.LOADED"/>
        <div class="characters__content">
        <CharactersList
        v-for="character in CHARACTERS"
        :key="character.id"
        :character="character"
        />
          </div>
        <div class="characters__footer">
        <MyPaginate
      :counts="COUNTS"
      @changePage ="CHANGE_PAGE"
      :currentPage.sync="currentPage"
      />
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CharactersList from '../components/characters/CharactersList.vue'

export default {
  components:{CharactersList},
  data(){
    return{
      selected: 'Выберите статус',
      statusOptions: [
        {name: 'Все', value:'All'},
        {name: 'Живы', value:'Alive'},
        {name: 'Мертвы', value:'Dead'},
        {name: 'Неизвестно', value:'unknown'},
      ],
        currentPage: 1
    }
  },
  computed:{
    ...mapGetters({
        CHARACTERS: 'characters/CHARACTERS',
        COUNTS: 'characters/COUNTS',
        STATUS: 'characters/STATUS',
        LOADED: 'characters/LOADED',
        SEARCH: 'characters/SEARCH'
    })
  },
  methods:{
    ...mapActions({
        GET_CHARACTERS_FROM_API: 'characters/GET_CHARACTERS_FROM_API',
        CHANGE_PAGE: 'characters/CHANGE_PAGE',
        CHANGE_STATUS: 'characters/CHANGE_STATUS',
        SEARCH_TERM: 'characters/SEARCH_TERM'
    })
  },
  mounted(){
    this.GET_CHARACTERS_FROM_API()
  },
  watch:{
    'STATUS': function(){
      this.currentPage = 1
      this.statusOptions.forEach(item =>{
        if(item.value === this.STATUS){
          this.selected = item.name
          this.$router.push({name: 'characters', query:{
                status: this.STATUS
          }})
        }
      })
    },
    'SEARCH': function(){
      this.currentPage = 1
      this.$router.push({name: 'characters', query:{
        search: this.SEARCH
      }})
    },
        'currentPage': function(){
      this.$router.push({name: 'characters', query:{
        ...this.$route.query,
          page: this.currentPage,
      }})
    }
  }
}
</script>


<style>
.characters {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  justify-content: center;
  position: relative;
}
.params{
  display: flex;
  justify-content: space-between;
}
.title {
  color: white;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.characters__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.characters__footer {
  margin: 0 auto;
}
</style>