<template>
  <div class="pagination" @click="changePage(currentPage)">
      <b-pagination
        v-model="currentPage"
        :total-rows="counts"
        :per-page="20"
        aria-controls="my-table"
        :limit="7"
      ></b-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['counts'],
    data(){
        return{
            currentPage: 1
        }
    },
    computed:{
        ...mapGetters({
            STATUS: 'characters/STATUS',
            SEARCH: 'characters/SEARCH'
        })
    },
    methods:{
        changePage(currentPage){
            this.$emit('changePage', currentPage)
        }
    },
    watch:{
        'STATUS': function(){
            this.currentPage = 1
            this.$router.push({name: 'characters', query:{
                status: this.STATUS
            }})
        },
        'SEARCH': function(){
            this.currentPage = 1
            this.$router.push({name: 'characters', query:{
                search: this.SEARCH
            }})
        },
        'currentPage': function(){
            this.$router.push({name: 'characters', query:{
                ...this.$route.query,
                page: this.currentPage,
            }})
        }
    }
}
</script>

<style>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}
.pagination .page-item{
    margin-right: 10px;
    box-shadow: none;
}
.pagination .page-item:hover .page-link{
    background-color: white;
    color: orange;
    border: 1px solid black;
}
.pagination .page-item:focus .page-link{
    box-shadow: none;
}
.pagination .page-link{
    color: white;
    background-color: black;
    font-weight: bold;
}
.pagination .page-item.active .page-link{
    color: black;
    background-color: orange;
    border: 1px solid black;
    box-shadow: none;
}
.pagination .page-item:focus,
.pagination .page-link:active{
    outline: none;
    box-shadow: none;
}
.pagination .page-item.disabled .page-link{
    background-color: lightslategrey;
    color: black;
}
</style>