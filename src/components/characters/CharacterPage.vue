<template>
  <div class="item__page">
    <div class="item__close" @click="backPage">
      <b-icon class="item__arrow--left" icon="arrow-return-left"></b-icon>
      Назад
    </div>
    <h1 class="item__page-name">{{ character.name }}</h1>
    <div class="item">
      <img :src="character.image" class="item__page-img">
      <div class="item__page-info">
        <span class="item__brief">Краткая информация:</span>
        <span class="item__created"><span class="item__params">Создан</span> {{ character.created }}</span>
        <span class="item__gender"><span class="item__params">Пол</span> {{ character.gender }}</span>
        <span class="item__species"><span class="item__params">Вид</span> {{ character.species }}</span>
        <span class="item__status"><span class="item__params">Статус</span> {{ character.status }}</span>
        <span class="item__origin"><span class="item__params">Родился
          </span> 
          <router-link v-if="this.origin.name" class="item__origin-link" :to="{name: 'locationPage', params:{id: this.origin.id }}">
          {{ this.origin.name }}
          </router-link>
          <span v-else>Неизвестно</span>
          </span>
        <span class="item__location"><span class="item__params">Проживает</span> 
        <router-link class="item__location-link" :to="{name: 'locationPage', params:{id: this.location.id }}">
        {{ this.location.name}}
        </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      character: {},
      location: [],
      origin: []
    }
  },
  methods: {
    getData() {
      this.$api.get('character/'+this.$route.params.id)
      .then((response) => {
        this.character = response.data;
        this.location = this.character['location'].url.slice(41)
        this.origin = this.character['origin'].url.slice(41)
      })
      .then(() =>{
        this.$api.get('location/' + this.character['location'].url.slice(41))
        .then(response =>{
          this.location = response.data
        })
      })
      .then(() =>{
        this.$api.get('location/' + this.character['origin'].url.slice(41))
        .then(response =>{
          this.origin = response.data
        })
      })
    },
    backPage() {
      this.$router.go(-1)
    }
  },
  created() {
    this.getData();
  }
}
</script>

<style>
.item__page {
  background-color: white;
  margin-top: 20px;
  text-align: center;
  border-radius: 10px;
  position: relative;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
}

.item__top {
  display: flex;
}

.item__close {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  margin-right: 37%;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
}

.item__close:hover {
  color: orange;
}

.item__arrow--left {
  font-size: 15px;
}

.item__page-img {
  width: 350px;
  height: 400px;
  border-radius: 10px;
  border: 2px solid black;
}

.item__page-info {
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  width: 250px;
  height: 500px;
}

.item__brief {
  background-color: darkslategrey;
  color: white;
  font-weight: bold;
  padding: 10px;
  margin-bottom: 20px;
}

.item__params {
  font-weight: bold;
  margin-bottom: 5px;
}

.item__created {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
}

.item__gender {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
}

.item__species {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
}

.item__status {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
}
.item__origin{
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
}
.item__location{
  display: flex;
  flex-direction: column;
}
.item__origin-link{
  text-decoration: none;
  font-weight: bold;
  color: orange;
}
.item__origin-link:hover{
  color: black;
}
.item__location-link{
  text-decoration: none;
  font-weight: bold;
  color: orange;
}
.item__location-link:hover{
  color: black;
}
</style>