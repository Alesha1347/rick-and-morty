<template>
  <div class="item__page">
          <div class="item__close" @click="backPage"><b-icon class="item__arrow--left" icon="arrow-return-left"></b-icon> Назад</div>
      <h1 class="item__page-name">{{ location.name }}</h1>
      <div class="item">
          <img src="../../assets/planet.jpg" class="item__page-img">
          <div class="item__page-info">
              <span class="item__brief">Краткая информация:</span>
              <span class="item__created"><span class="item__params">Создан</span> {{ location.created }}</span>
              <span class="item__dimension"><span class="item__params">Измерение</span> {{ location.dimension }}</span>
              <span class="item__type"><span class="item__params">Тип</span> {{ location.type }}</span>
              <span class="character__residents">
                  <span class="item__params">Жители</span>
                <router-link :to="{name: 'characterPage', params:{id:location.id}}">
                   {{ location.residents[0] }}
                </router-link>
                  </span>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            location: null
        }
    },
    computed:{
        ...mapGetters({
            ID: 'locations/ID'
        })
    },
    methods:{
        fetchData(){
            let id = this.$route.params.id
            this.location = this.ID(id)
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
.item__dimension {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
}
.item__type {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
}
.item__residents {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
</style>