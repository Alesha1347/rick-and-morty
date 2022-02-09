<template>
  <div id="app">
      <router-view></router-view> 
    </div>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style>
#app{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.body{
  background-color: black;
}

.wrapper {
  max-width: 1300px;
  margin: 0 auto;
}
</style>
