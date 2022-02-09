import axios from "axios"

const episodes = {
    state:{
        episodes: [],
        page: 1,
        counts: 0,
        isLoaded: false,
        searchTerm: '',
        firstEpisodes: 1,
        lastEpisodes: 0,
        maxEpisodes: 0,
    },
    mutations:{
        SET_EPISODES(state, episodes){
            state.episodes = episodes
        },
        SET_COUNTS(state, counts){
            state.counts = counts
            state.maxEpisodes = counts
        },
        SET_PAGE(state, pageNum){
            state.page = pageNum
        },
        SET_SEARCH_TERM(state, searchTerm){
            state.searchTerm = searchTerm
        },
        CHANGE_FIRST_EPISODES(state, firstEpisodes){
            state.firstLocation = firstEpisodes
        },
        CHANGE_LAST_EPISODES(state, lastEpisodes){
            state.lastLocation = lastEpisodes
        },
        SET_LAST_EPISODES(state, lastEpisodes){
            state.lastEpisodes = lastEpisodes
        }
    },
    actions:{
        GET_EPISODES_FROM_API({commit}){
            this.state.episodes.isLoaded = true
            let query = 'https://rickandmortyapi.com/api/episode'
            if(this.state.episodes.page){
                query += '?page=' + this.state.episodes.page
            } if(this.state.episodes.searchTerm){
                query += '&name=' + this.state.episodes.searchTerm
            }
            axios.get(query)
            .then(episodes =>{
                commit('SET_EPISODES', episodes.data.results)
                commit('SET_COUNTS', episodes.data.info.count)
                commit('SET_LAST_EPISODES', episodes.data.info.count)
                console.log(episodes.data.results[0])
            })
            .catch((err) => console.log(err))
            .finally(() => this.state.episodes.isLoaded = false)
        },
        CHANGE_PAGE({dispatch, commit}, pageNum){
            commit('SET_PAGE', pageNum)
            dispatch('GET_EPISODES_FROM_API')
        },
        SEARCH_TERM({dispatch, commit}, searchTerm){
            commit('SET_SEARCH_TERM', searchTerm)
            dispatch('GET_EPISODES_FROM_API')
        },
        CHANGE_FIRST_EPISODES({ commit}, firstEpisodes){
            commit('CHANGE_FIRST_EPISODES', firstEpisodes)
        },
        CHANGE_LAST_EPISODES({ commit}, lastEpisodes){
            commit('CHANGE_LAST_EPISODES', lastEpisodes)
        },
    },
    getters:{
        EPISODES: state => state.episodes,
        COUNTS: state => state.counts,
        LOADED: state => state.isLoaded,
        MAX_EPISODES: state => state.maxLocation
    },
    namespaced: true
}

export default episodes