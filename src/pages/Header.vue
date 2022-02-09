<template>
      <div class="header">
      <div class="wrapper">
        <div class="header__inner">
          <div class="header__left">
            <router-link to="/">
            <img src="@/assets/logo.svg" alt="">
            </router-link>
          </div>
          <div class="header__right">
            <ul class="menu__links">
               <b-navbar>
    <b-navbar-nav>
          <router-link class='menu__link' active-class="active" exact :to="{name: 'characters'}">Персонажи</router-link>
          <router-link class="menu__link" active-class="active" :to="{name: 'locations'}">Локации</router-link>
          <router-link class="menu__link" active-class="active" :to="{name: 'episodes'}">Эпизоды</router-link>
    </b-navbar-nav>
  </b-navbar>
            </ul>
          </div>
      </div>
      <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      isActive: false
    }
  },
  methods:{
    myFilter(){
      this.isActive = !this.isActive
    }
  }
}
</script>

<style>
.header {
  background-image: url('../assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 350px;
}
.header__inner {
  padding-top: 120px;
  height: 400px;
}
.header__left {
  cursor: pointer;
  margin-bottom: 150px;
}
.menu__links {
  display: flex;
  list-style-type: none;
  justify-content: center;
  background-color: black;
}
.menu__link {
  color: white;
  margin-right: 20px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  padding: 11px;
  text-decoration: none;
}
.menu__link.active{
  color: orange;
  background-color: white;
}
.menu__link:hover{
  background-color: white;
  color: black;
}
</style>