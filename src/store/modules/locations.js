import axios from "axios"

const locations = {
    state:{
        locations:[],
        counts: 0,
        page: 1,
        firstLocation: 1,
        lastLocation: 0,
        maxLocation: 0,
        difference: 0
    },
    mutations:{
        SET_LOCATIONS(state, locations){
            state.locations = locations
        },
        SET_COUNTS(state, counts){
            state.counts = counts
            state.maxLocation = counts
        },
        SET_PAGE(state, pageNum){
            state.page = pageNum
        },
        SET_LAST_LOCATION(state, lastLocation){
            state.lastLocation = lastLocation
        },
        CHANGE_FIRST_LOCATION(state, firstLocation){
            state.firstLocation = firstLocation
        },
        CHANGE_LAST_LOCATION(state, lastLocation){
            state.lastLocation = lastLocation
        },
        SET_LOCATIONS_NUMBER(state, locationNum){
            state.locations = locationNum
        },
        SET_DIFFERENCE(state, difference){
            state.difference = difference
        }
    },
    actions:{
        GET_LOCATIONS_FROM_API({commit}){
            axios.get(`https://rickandmortyapi.com/api/location/?page=${this.state.locations.page}`)
            .then(locations => {
                commit('SET_LOCATIONS', locations.data.results)
                commit('SET_COUNTS', locations.data.info.count)
                commit('SET_LAST_LOCATION', locations.data.info.count)
                commit('SET_DIFFERENCE', locations.data.info.count - 1)
                console.log(locations.data.info)
            })
        },
        CHANGE_PAGE({dispatch, commit}, pageNum){
            commit('SET_PAGE', pageNum)
            if(this.state.locations.difference > this.state.locations.lastLocation - this.state.locations.firstLocation){
                dispatch('GET_LOCATIONS_NUMBER_FROM_API')
            } else {
                dispatch('GET_LOCATIONS_FROM_API')
            }
        },
        GET_LOCATIONS_NUMBER_FROM_API({dispatch, commit}){
            if(this.state.locations.difference > this.state.locations.lastLocation - this.state.locations.firstLocation){
                console.log(1)
                let res = []
                for(let i = this.state.locations.firstLocation; i < this.state.locations.lastLocation; i++){
                    res.push(i)
                }
                axios.get(`https://rickandmortyapi.com/api/location/${res.map(n => n)}`)
                .then(locations =>{
                    commit('SET_LOCATIONS_NUMBER', locations.data.results)
                    commit('SET_COUNTS', locations.data.info.count)
                })
            } else {
                dispatch('GET_LOCATIONS_FROM_API')
            }
        },
        CHANGE_FIRTST_LOCATION({commit}, firstLocation){
            commit('CHANGE_FIRST_LOCATION', firstLocation)
        },
        CHANGE_LAST_LOCATION({commit}, lastLocation){
            commit('CHANGE_LAST_LOCATION', lastLocation)
        }
    },
    getters:{
        LOCATIONS: state => state.locations,
        COUNTS: state => state.counts,
        FIRST_LOCATION: state => state.firstLocation,
        LAST_LOCATION: state => state.lastLocation,
        MAX_LOCATION: state => state.maxLocation
    },
    namespaced: true
}

export default locations