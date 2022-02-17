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
              <span class="character__residents" >
                  <span class="item__params">Жители:</span>
                  <div v-if="residents.length > 1">
                    <span class="item__residents"
                    v-for="(item,index) in residents"
                    :key="index"
                    >
                    <router-link class="item__residents-link" :to="{name: 'characterPage', params:{id: item.id}}">
                    {{ item.name }}
                    </router-link>
                    </span>
                  </div>
                  <div v-else-if="residents.length !== 0"> 
                    <router-link class="item__residents-link" :to="{name: 'characterPage', params:{id: residents.id}}">
                      {{ residents.name }} 
                    </router-link>
                      </div>
                      <span v-else>Незивестно</span>
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
            location: {},
            character: [],
            residents: []
        }
    },
    computed:{
        ...mapGetters({
            ID: 'locations/ID'
        })
    },
    methods:{
        getData() {
        this.$api.get('location/'+this.$route.params.id).then((response) => {
        this.location = response.data;
        this.character = this.location['residents'].map(id => {
            return Number(id.slice(42))
        })
        })
        .then(() =>{
        this.$api.get('character/' + this.character)
        .then(response => {
            this.residents = response.data
        })
        })
        },
        backPage(){
            this.$router.go(-1)
        }
    },
    created(){
        this.getData()
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
    margin-bottom: 10px;
}
.character__residents {
    overflow: scroll;
}
.item__residents-link{
    text-decoration: none;
    color: orange;
    font-weight: bold;
}
.item__residents-link:hover{
    color: black;
}
</style>