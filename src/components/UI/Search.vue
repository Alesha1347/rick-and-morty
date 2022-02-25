<template>
<div class="search">
    <b-input-group size="sm">
      <b-form-input 
      placeholder="Search..."
      class="search__input"
      v-model="value"
      @input="searchCharacters(value)"
      ></b-form-input>
        <b-input-group-prepend is-text>
        <b-icon icon="search" class="search__icon"></b-icon>
      </b-input-group-prepend>
    </b-input-group>
</div>
       
</template>

<script>
export default {
    name: 'MySearch',
    data(){
        return{
            value: '',
            timeout: 0,
        }
    },
    methods:{
        searchCharacters(value){
            if(this.timeout){
                clearTimeout(this.timeout)
            }
            this.$store.state.characters.isLoaded = true
            this.$store.state.locations.isLoaded = true
            this.$store.state.episodes.isLoaded = true
            this.timeout = setTimeout(() =>{
            this.$emit('searchCharacters', value)
            this.$store.state.characters.isLoaded = false
            this.$store.state.locations.isLoaded = false
            this.$store.state.episodes.isLoaded = true
            }, 1000)
        },
    }
}
</script>

<style>
.search{
    width: 250px;
}
.form-control{
    width: 250px;
    height: 40px;
    font-size: 25px;
    align-items: center;
}
.search__input.form-control:focus,
.search__input.form-control:active{
    outline: none;
    box-shadow: none;
    border: none;
    font-size: 18px;
}
.search__icon{
    height: 26px;
}
</style>