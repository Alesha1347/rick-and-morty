<template>
  <div class="footer">
      <div class="footer__content">
        <div class="footer__img-container">
          <img class="footer__img"
          @click="scrollToTop" 
          src="../assets/footer.jpg">
        </div>
        <div class="footer__info">
          <div class="footer__info-doc">
            <a class="footer__link" href="https://rickandmortyapi.com/">
            Документация
            </a>
          </div>
          <div class="footer__info-git">
            <a class="footer__link" href="https://github.com/Alesha1347/rick-and-morty">
              GitHub
            </a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  methods:{
    scrollToTop(){
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style>
.footer{
  border-top: 1px solid rgb(201, 194, 194);
}
.footer__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 150px;
}
.footer__img-container{
  height: 200px;
  width: 200px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 10px;
}
.footer__img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
}
.footer__info {
  display: flex;
  flex-direction: column;
}
.footer__info-doc {
  margin-bottom: 40px;
}
.footer__info-git {
}
.footer__link{
  text-decoration: none;
  font-size: 25px;
  font-weight: bold;
  color: orange;
}
</style>