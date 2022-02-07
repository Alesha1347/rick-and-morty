<template>
  <div class="location__item">
      <img class="location__img">
      <div class="location__info">
      <div class="location__name">{{ location.name }}</div>
    <div class="location__number">Локация #{{ location.id }}</div>
      <div class="location__type">type: {{ location.type }}</div>
      </div>
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
}
.location__item:hover{
  box-shadow: 10px 5px 5px black;
}
.location__img {
    background-image: url('../../assets/planet.jpg');
    width: 250px;
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
}
.location__type {
    color: white;
}
</style>