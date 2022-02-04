<template>
    <div>
        <div class="character__item">
        <router-link :to="{name: 'characterPage', params:{id:character.id}}">
        <img :src="character.image" alt="" class="character__img">
        <div class="character__info">
          <span class="character__info-name">{{ character.name }}</span>
          <span class="character__info-status">Status: {{character.status}}</span>
        </div>
        </router-link>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        character:{
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style>
.character__item {
  border: 4px solid black;
  border-radius: 3px;
  margin: 20px;
  cursor: pointer;
}
.character__item:hover{
  box-shadow: 10px 5px 5px black;
}
.character__img {
  max-width: 200px;
  max-height: 200px;
}
.character__info {
  display: flex;
  flex-direction: column;
  background-color: black;
  opacity: 0.9;
}
.character__info-name {
  font-weight: bold;
  color: rgb(214, 145, 16);
}
.character__info-status {
  color: white;
}
</style>