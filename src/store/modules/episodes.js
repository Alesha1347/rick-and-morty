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
        numEpisodes: []
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
            state.firstEpisodes = firstEpisodes
        },
        CHANGE_LAST_EPISODES(state, lastEpisodes){
            state.lastEpisodes = lastEpisodes
        },
        SET_LAST_EPISODES(state, lastEpisodes){
            state.lastEpisodes = lastEpisodes
        }
    },
    actions:{
        GET_EPISODES_FROM_API({commit}){
            this.state.episodes.isLoaded = true
            let query = 'https://rickandmortyapi.com/api/episode/'
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
            })
            .catch((err) => console.log(err))
            .finally(() => this.state.episodes.isLoaded = false)
        },
        GET_EPISODES_NUM_FROM_API({dispatch, commit}){
            this.state.episodes.isLoaded = true
            let query = 'https://rickandmortyapi.com/api/episode/'
                let res = []
                for(let i = this.state.episodes.firstEpisodes; i < this.state.episodes.lastEpisodes; i++){
                    res.push(i)
                }
                if(res.length < 50){
                    query += `${res}`
                    this.state.episodes.numEpisodes = []
                    this.state.episodes.numEpisodes.push(...res)
                    axios.get(query)
                    .then(episodes =>{
                        commit('SET_EPISODES', episodes.data)
                    })
                    .catch(err => console.log(err))
                    .finally(() => this.state.episodes.isLoaded = false)        
                } else {
                    this.state.episodes.numEpisodes = []
                    dispatch('GET_EPISODES_FROM_API')
                }

        },
        CHANGE_PAGE({dispatch, commit}, pageNum){
            commit('SET_PAGE', pageNum)
            dispatch('GET_EPISODES_FROM_API')
        },
        SEARCH_TERM({dispatch, commit}, searchTerm){
            commit('SET_SEARCH_TERM', searchTerm)
            dispatch('GET_EPISODES_FROM_API')
        },
        CHANGE_FIRST_EPISODES({dispatch, commit}, firstEpisodes){
            commit('CHANGE_FIRST_EPISODES', firstEpisodes)
            dispatch('GET_EPISODES_NUM_FROM_API')
        },
        CHANGE_LAST_EPISODES({dispatch, commit}, lastEpisodes){
            commit('CHANGE_LAST_EPISODES', lastEpisodes)
            dispatch('GET_EPISODES_NUM_FROM_API')
        },
    },
    getters:{
        EPISODES: state => state.episodes,
        COUNTS: state => state.counts,
        LOADED: state => state.isLoaded,
        MAX_EPISODES: state => state.maxEpisodes,
        SEARCH: state => state.searchTerm,
        NUM_EPISODES: state => state.numEpisodes
    },
    namespaced: true
}

export default episodes