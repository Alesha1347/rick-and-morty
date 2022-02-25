<template>
            <div class="range-slider">
        <div class="values">
            <span class="range1">
                {{this.firstLocation}}
            </span>
            <span>&dash;</span>
            <span class="range2">
                {{this.lastLocation}}
            </span>
        </div>
        <div class="range-slider-inputs" @mouseover="showPrice" @mouseout="hidePrice">
            <div class="slider-track"></div>
        <input @mousemove="fillColor" @change="sliderOne" type="range" :min="this.minLocation" :max="this.maxLocation" value="30" class="slider-1" v-model.number="firstLocationChange">
        <input @mousemove="fillColor" @change="sliderTwo" type="range" :min="this.minLocation" :max="this.maxLocation" value="70" class="slider-2" v-model.number="lastLocationChange">
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'MyRangeSlider',
    props:['firstLocation', 'lastLocation', 'maxLocation', 'minLocation'],
    data(){
        return{
            minGap:5,
            timeout: 0
        }
    },
    computed:{
        ...mapGetters({
            LAST_LOCATION: 'locations/LAST_LOCATION'
        }),
        firstLocationChange:{
            get(){
                return this.firstLocation
            },
            set(newFirstLocation){
                this.$emit('update:firstLocation', newFirstLocation)
            }
        },
        lastLocationChange:{
            get(){
                return this.lastLocation
            },
            set(newLastLocation){
                this.$emit('update:lastLocation', newLastLocation)
            }
        }
    },
    methods:{
        hidePrice(){
        const val = document.querySelectorAll('.values')
        val.forEach(e => { e.classList.remove('active')})  
        },
        showPrice(){
        const val = document.querySelectorAll('.values')
        val.forEach(e => { e.classList.add('active')})
        },
        sliderOne(){
            let myFirstLocation = this.firstLocation
            if(this.timeout){
                clearTimeout(this.timeout)
            }
            this.$store.state.episodes.isLoaded = true
            this.timeout = setTimeout(() =>{
            this.$emit('sliderOne', myFirstLocation)
            this.$store.state.episodes.isLoaded = false
            },1000)
            this.rangeChange()
        },
        sliderTwo(){
            let myLastLocation = this.lastLocation
            if(this.timeout){
                clearTimeout(this.timeout)
            }
            this.$store.state.episodes.isLoaded = true
            this.timeout = setTimeout(() =>{
            this.$emit('sliderTwo', myLastLocation)
            this.$store.state.episodes.isLoaded = false
            },1000)
            this.rangeChange()
        },
        rangeChange(){
            const rangeInput = document.querySelectorAll('.range-slider-inputs input')
            rangeInput.forEach(input =>{
                input.addEventListener('input', (e) =>{
                let minVal = parseInt(rangeInput[0].value)
                let maxVal = parseInt(rangeInput[1].value)

                if(maxVal - minVal < this.minGap){
                    if(e.target.className === 'slider-1'){
                    this.firstLocationChange = rangeInput[0].value = maxVal - this.minGap
                    } else {
                    this.lastLocationChange = rangeInput[1].value = minVal + this.minGap
                    }
                }
                })
            })
        },
        fillColor(){
            let sliderTrack = document.querySelector('.slider-track')
            let sliderMaxValue = document.querySelector('.slider-1').max
            let sliderOneValue = document.querySelector('.slider-1').value
            let sliderTwoValue = document.querySelector('.slider-2').value
            let percent1 = (sliderOneValue / sliderMaxValue) * 100
            let percent2 = (sliderTwoValue / sliderMaxValue) * 100
            sliderTrack.style.background = `linear-gradient(to right, white ${percent1}% , orange ${percent1}% , purple ${percent2}% , white ${percent2}%)`
        }
    },
    mounted(){
        this.fillColor()
    }
}
</script>

<style>
.range-slider {
    width: 40vmin;
    margin-top: -80px;
}
.range-slider-inputs {
    width: 100%;
    height: 100px;
    position: relative;
    pointer-events: none;
}
.slider-track {
    width: 100%;
    height: 5px;
    background-color: #d5d5d5;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    border-radius: 5px;
}
input[type="range"]{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    outline: none;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    pointer-events: none;
}
input[type="range"]::-webkit-slider-runnable-track{
    -webkit-appearance: none;
    height: 5px;
}
input[type="range"]::-moz-range-track{
    -moz-appearance: none;
    height: 5px;
}
input[type="range"]::-ms-track{
    appearance: none;
    height: 5px;
}
input[type="range"]::-webkit-slider-thumb{
    -webkit-appearance: none;
    height: 1.7em;
    width: 1.7em;
    background-color: orange;
    cursor: pointer;
    border-radius: 15px;
    margin-top: -11px;
    pointer-events: auto;
}
input[type="range"]::-moz-range-thumb{
    -webkit-appearance: none;
    height: 1.7em;
    width: 1.7em;
    background-color: orange;
    cursor: pointer;
    border-radius: 50%;
    pointer-events: auto;
}
input[type="range"]::-ms-thumb{
    appearance: none;
    height: 1.7em;
    width: 1.7em;
    background-color: orange;
    cursor: pointer;
    border-radius: 50%;
    pointer-events: auto;
}
input[type="range"]:active::-webkit-slider-thumb{
    background-color: black;
    border: 3px solid yellow;
}
.values{
    opacity: 0;
    background-color: orange;
    width: 35%;
    position: relative;
    margin: auto;
    padding: 10px 0;
    border-radius: 5px;
    font-weight: 500;
    text-align: center;
    color: white;
    font-size: 25px;
}
.values.active{
    opacity: 1;
}
.values::before{
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    border-top: 15px solid orange;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    margin: auto;
    bottom: -15px;
    left: 0;
    right: 0;
}
/* .range1 {
}
.range2 {
}
.slider-1 {
}
.slider-2 {
} */
</style>