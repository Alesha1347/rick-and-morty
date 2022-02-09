<template>
  <div class="spinner">
      <div class="spinner__inner">
      <b-spinner style="width: 15rem; height: 15rem;" type="grow"></b-spinner>
      </div>
  </div>
</template>

<script>
export default {
    name: 'MySpinner'
}
</script>

<style>
.spinner {
    background-color: black;
    opacity: 0.8;
    position: absolute;
    width: 100%;
    height: 100%;
}
.spinner__inner{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
.spinner .spinner-grow{
    color: rgb(245, 172, 35);
}
</style>