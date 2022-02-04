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
      <div class="characters">
        <MySpinner v-if="this.LOADED"/>
        <CharactersList
        v-for="character in CHARACTERS"
        :key="character.id"
        :character="character"
        />
      </div>
        <Paginate
      class="pag"
      :counts="COUNTS"
      @changePage ="CHANGE_PAGE"
      />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CharactersList from '../components/characters/CharactersList.vue'
import Paginate from '../components/UI/Paginate.vue'

export default {
  components:{CharactersList, Paginate},
  data(){
    return{
      selected: 'Выберите статус',
      statusOptions: [
        {name: 'Все', value:'All'},
        {name: 'Живы', value:'Alive'},
        {name: 'Мертвы', value:'Dead'},
        {name: 'Неизвестно', value:'unknown'},
      ]
    }
  },
  computed:{
    ...mapGetters({
        CHARACTERS: 'characters/CHARACTERS',
        COUNTS: 'characters/COUNTS',
        STATUS: 'characters/STATUS',
        LOADED: 'characters/LOADED'
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
      this.statusOptions.forEach(item =>{
        if(item.value === this.STATUS){
          this.selected = item.name
        }
      })
    }
  }
}
</script>


<style>
.characters {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.params{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.pag{
  background-color: white;
  margin: 0 auto;
  padding-top: 20px;
}
</style>