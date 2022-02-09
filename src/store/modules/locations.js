import axios from "axios"

const locations = {
    state:{
        locations:[],
        counts: 0,
        page: 1,
        firstLocation: 1,
        lastLocation: 126,
        maxLocation: 0,
        searchTerm: '',
        isLoaded: false
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
        // SET_LAST_LOCATION(state, lastLocation){
        //     state.lastLocation = lastLocation
        // },
        CHANGE_FIRST_LOCATION(state, firstLocation){
            state.firstLocation = firstLocation
        },
        CHANGE_LAST_LOCATION(state, lastLocation){
            state.lastLocation = lastLocation
        },
        SET_SEARCH_TERM(state, searchTerm){
            state.searchTerm = searchTerm
        }
    },
    actions:{
        GET_LOCATIONS_FROM_API({commit}){
            this.state.characters.isLoaded = true
            let query = `https://rickandmortyapi.com/api/location/`
            if(this.state.locations.page){
                query += '?page=' + this.state.locations.page
            } 
            if(this.state.locations.searchTerm){
                query += '&name=' + this.state.locations.searchTerm
            }
            if(this.state.locations.lastLocation - this.state.locations.firstLocation < 125){
                console.log(123)
                query += ''
            }
            axios.get(query)
            .then(locations => {
                commit('SET_LOCATIONS', locations.data.results)
                commit('SET_COUNTS', locations.data.info.count)
                // commit('SET_LAST_LOCATION', locations.data.info.count)
                console.log(locations.data.results[0])
            })
            .catch((err) => console.log(err))
            .finally(() => this.state.characters.isLoaded = false)
        },
        CHANGE_PAGE({dispatch, commit}, pageNum){
            commit('SET_PAGE', pageNum)
            dispatch('GET_LOCATIONS_FROM_API')
        },
        CHANGE_FIRST_LOCATION({ commit}, firstLocation){
            commit('CHANGE_FIRST_LOCATION', firstLocation)
            // dispatch('GET_LOCATIONS_FROM_API')
        },
        CHANGE_LAST_LOCATION({ commit}, lastLocation){
            commit('CHANGE_LAST_LOCATION', lastLocation)
            // dispatch('GET_LOCATIONS_FROM_API')
        },
        SEARCH_TERM({dispatch, commit}, searhTerm){
            this.state.locations.page = 1
            commit('SET_SEARCH_TERM', searhTerm)
            dispatch('GET_LOCATIONS_FROM_API')
        }
    },
    getters:{
        LOCATIONS: state => state.locations,
        COUNTS: state => state.counts,
        FIRST_LOCATION: state => state.firstLocation,
        LAST_LOCATION: state => state.lastLocation,
        MAX_LOCATION: state => state.maxLocation,
        ID: state => id => state.locations.find(location => location.id === id),
        LOADED: state => state.isLoaded
    },
    namespaced: true
}

export default locations