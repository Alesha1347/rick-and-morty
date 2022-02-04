<template>
  <div class="character__page">
          <div class="character__close" @click="backPage"><b-icon class="character__arrow--left" icon="arrow-return-left"></b-icon> Назад</div>
      <h1 class="character__page-name">{{ character.name }}</h1>
      <div class="character">
          <img :src="character.image" class="character__page-img">
          <div class="character__page-info">
              <span class="charecter__brief">Краткая информация:</span>
              <span class="character__created"><span class="character__params">Создан</span> {{ character.created }}</span>
              <span class="character__gender"><span class="character__params">Пол</span> {{ character.gender }}</span>
              <span class="character__species"><span class="character__params">Вид</span> {{ character.species }}</span>
              <span class="character__status"><span class="character__params">Статус</span> {{ character.status }}</span>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            character: null
        }
    },
    computed:{
        ...mapGetters({
            ID: 'characters/ID'
        })
    },
    methods:{
        fetchData(){
            let id = this.$route.params.id
            this.character = this.ID(id)
        },
        backPage(){
            this.$router.go(-1)
        }
    },
    created(){
        this.fetchData()
    }
}
</script>

<style>
.character__page {
    background-color: white;
    margin-top: 20px;
    text-align: center;
    border-radius: 10px;
    position: relative;
}
.character {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
}
.character__top {
    display: flex;
}
.character__close {
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    margin-right: 37%;
    padding: 10px;
    position: absolute;
    top: 10px;
    left: 10px;
}
.character__close:hover{
    color: orange;
}
.character__arrow--left{
    font-size: 15px;
}
.character__page-img {
    width: 350px;
    height: 400px;
    border-radius: 10px;
    border: 2px solid black;
}
.character__page-info {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    width: 250px;
    height: 342px;
}
.charecter__brief {
    background-color: darkslategrey;
    color: white;
    font-weight: bold;
    padding: 10px;
    margin-bottom: 20px;
}
.character__params{
    font-weight: bold;
    margin-bottom: 5px;
}
.character__created {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
}
.character__gender {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
}
.character__species {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
}
.character__status {
    display: flex;
    flex-direction: column;
}
</style>