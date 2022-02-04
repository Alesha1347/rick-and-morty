<template>
    <div class="select">
        <div class="select-title"
        @click="isShowOptions = !isShowOptions">
        {{selected}} <b-icon :icon="this.isShowOptions ? 'chevron-double-up' : 'chevron-double-down'"></b-icon></div>

        <div class="options" 
        v-if="isShowOptions">
            <div class="choose"
            v-for="category in categories"
            :key="category.id"
            @click="chooseSelect(category.value)"
            >
            {{category.name}}
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'MySelect',
    props:{
        selected:{
            type:String,
            required: true
        },
        categories:{
            type: Array,
            default(){
                return {}
            }
        }
    },
    data(){
        return{
            isShowOptions: false
        }
    },
    methods:{
        chooseSelect(category){
            this.$emit('chooseSelect', category)
        },
        hideSelect(){
            this.isShowOptions = false
        }
    },
    mounted(){
        document.addEventListener('click', this.hideSelect, true)
    },
    beforeDestroy(){
        document.removeEventListener('click', this.hideSelect, true)
    }
}
</script>

<style>
.select{
    position: relative;
    width: 200px;
    margin-bottom: 40px;
    background-color: white;
    border-radius: 10px;
    font-size: 18px;
}
.select-title{
    cursor: pointer;
    text-align: left;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.choose{
    margin: 0px;
    cursor: pointer;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
}
.choose:hover{
    background-color: black;
    color: orange;
}
.options{
    position: absolute;
    top: 40px;
    right: 0;
    width: 100%;
    text-align: left;
}

</style>