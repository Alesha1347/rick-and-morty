<template>
  <div class="location__item">
      <router-link class="location__item-link" :to="{name: 'locationPage', params:{id: location.id}}">
      <img class="location__img">
      <div class="location__info">
      <div class="location__name">{{ location.name }}</div>
    <div class="location__number">Локация #{{ location.id }}</div>
      <div class="location__type">type: {{ location.type }}</div>
      </div>
      </router-link>
  </div>
</template>

<script>
export default {
    props:{
        location:{
            type: Object,
            default:() => {}
        }
    }
}
</script>

<style>
.location__item {
    border: 4px solid black;
    border-radius: 3px;
    margin: 20px;
    cursor: pointer;
    width: 250px;
    
}
.location__item:hover{
  box-shadow: 10px 5px 5px black;
}
.location__img {
    background-image: url('../../assets/planet.jpg');
    width: 100%;
    height: 250px;
    background-repeat: no-repeat;
    background-size: cover;
}
.location__info {
    display: flex;
    flex-direction: column;
    background-color: black;
    opacity: 0.9;
    padding-left: 5px;
}
.location__number {
    color: white;
    font-weight: bold;
}
.location__name {
    font-weight: bold;
    color: rgb(214, 145, 16);
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.location__type {
    color: white;
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.location__item-link{
    text-decoration: none;
}
</style>