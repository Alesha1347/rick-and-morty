<template>
    <div class="episodes__item">
      <img class="episodes__img">
      <div class="episodes__info">
      <div class="episodes__name">{{ episodes.name }}</div>
    <div class="episodes__date">Дата выпуска: {{ episodes.air_date }}</div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        episodes:{
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style>
.episodes__item {
    border: 4px solid black;
  border-radius: 3px;
  margin: 20px;
  cursor: pointer;
}
.episodes__item:hover{
  box-shadow: 10px 5px 5px black;
}
.episodes__img {
    background-image: url('../../assets/poster.jpg');
    width: 250px;
    height: 250px;
    background-repeat: no-repeat;
    background-size: cover;
}
.episodes__info {
    display: flex;
    flex-direction: column;
    background-color: black;
    opacity: 0.9;
    padding-left: 5px;
}
.episodes__name {
    font-weight: bold;
    color: rgb(214, 145, 16);
}
.episodes__date {
    color: white;
    font-weight: bold;
}
</style>