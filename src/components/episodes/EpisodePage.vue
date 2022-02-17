<template>
  <div class="item__page">
      <MySpinner v-if="isLoaded"/>
    <div class="item__close" @click="backPage">
      <b-icon class="item__arrow--left" icon="arrow-return-left"></b-icon>
      Назад
    </div>
    <h1 class="item__page-name">#{{ episodes.name }}</h1>
    <h4 class="item__page-name">Персонажи выпуска:</h4>
    <div class="episode__item">
            <div class="character__item"
            v-for="character in characters"
            :key="character.id"
            >
            <router-link class="character__item-link" 
            :to="{name: 'characterPage', params: {id: character.id}}">
        <img :src="character.image" alt="" class="character__img">
        <div class="character__info">
          <span class="character__info-name">{{ character.name }}</span>
          <span class="character__info-status">Status: {{character.status}}</span>
        </div>
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            episodes:{},
            characters:{},
            iDs: [],
            isLoaded: false
        }
    },
    methods:{
        backPage() {
        this.$router.go(-1)
    },
    getData() {
    this.isLoaded = true
      this.$api.get('episode/'+this.$route.params.id)
        .then(response =>{
            this.episodes = response.data
            this.iDs = response.data['characters'].map(item =>{
                return Number(item.slice(42))
            })
        })
    .then(() =>{
        this.$api.get('character/' + this.iDs)
        .then(response =>{
            this.characters = response.data
        })
    })
    .finally(() => this.isLoaded = false)
    }
    },
    created(){
        this.getData()
    }
}
</script>

<style>
.episode__item{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
</style>