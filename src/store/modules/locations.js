import axios from "axios"

const locations = {
    state:{
        locations:[],
        counts: 0,
        page: 1,
        searchTerm: '',
        isLoaded: false,
        dimension: ''
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
        SET_SEARCH_TERM(state, searchTerm){
            state.searchTerm = searchTerm
        },
        SET_DIMENSION(state, dimension){
            state.dimension = dimension
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
            if(this.state.locations.dimension !== 'All' && this.state.locations.dimension){
                query += '&dimension=' + this.state.locations.dimension
            }
            axios.get(query)
            .then(locations => {
                commit('SET_LOCATIONS', locations.data.results)
                commit('SET_COUNTS', locations.data.info.count)
            })
            .catch((err) => console.log(err))
            .finally(() => this.state.characters.isLoaded = false)
        },
        CHANGE_PAGE({dispatch, commit}, pageNum){
            commit('SET_PAGE', pageNum)
            dispatch('GET_LOCATIONS_FROM_API')
        },
        SEARCH_TERM({dispatch, commit}, searhTerm){
            this.state.locations.page = 1
            commit('SET_SEARCH_TERM', searhTerm)
            dispatch('GET_LOCATIONS_FROM_API')
        },
        CHANGE_DIMENSION({dispatch, commit}, dimension){
            this.state.locations.page = 1
            commit('SET_DIMENSION', dimension)
            dispatch('GET_LOCATIONS_FROM_API')
        }
    },
    getters:{
        LOCATIONS: state => state.locations,
        COUNTS: state => state.counts,
        LOADED: state => state.isLoaded,
        SEARCH: state => state.searchTerm,
        DIMENSION: state => state.dimension
    },
    namespaced: true
}

export default locations