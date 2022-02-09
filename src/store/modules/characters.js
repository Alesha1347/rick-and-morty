import axios from "axios"

const characters = {
    state:{
        characters: [],
        counts: 0,
        page: 1,
        status: '',
        searchTerm: '',
        isLoaded: false
    },
    mutations:{
        SET_CHARACTERS(state, characters){
            state.characters = characters
        },
        SET_COUNTS(state, counts){
            state.counts = counts
        },
        SET_PAGE(state, pageNum){
            state.page = pageNum
        },
        SET_STATUS_CHARACTERS(state, statusChatacters){
            state.characters = statusChatacters
        },
        SET_STATUS(state, status){
            state.status = status
        },
        SET_SEARCH_CHARACTERS(state, searchCharacters){
            state.characters = searchCharacters
        },
        SET_SEARCH_TERM(state, searchTerm){
            state.searchTerm = searchTerm
        },
        SET_SEARCH_STATUS_CHARACTERS(state, characterdSearchStatus){
            state.characters = characterdSearchStatus
        }
    },
    actions:{
        GET_CHARACTERS_FROM_API({commit}){
            this.state.characters.isLoaded = true
            let query = `https://rickandmortyapi.com/api/character/`
            if(this.state.characters.page){
                query += '?page=' + this.state.characters.page
            } if(this.state.characters.status !== 'All' && this.state.characters.status){
                query += '&status=' + this.state.characters.status
            } if(this.state.characters.searchTerm){
                query += '&name=' + this.state.characters.searchTerm
            }
            axios.get(query)
            .then(characters => {
                commit('SET_CHARACTERS', characters.data.results)
                commit('SET_COUNTS', characters.data.info.count)
            })
            .catch(err => console.log(err))
            .finally(() => this.state.characters.isLoaded = false)
        },
        CHANGE_PAGE({dispatch, commit}, pageNum){
            commit('SET_PAGE', pageNum)
            dispatch('GET_CHARACTERS_FROM_API')
        },
        CHANGE_STATUS({dispatch, commit}, status){
            this.state.characters.page = 1
            commit('SET_STATUS', status)
            dispatch('GET_CHARACTERS_FROM_API')
        },
        SEARCH_TERM({dispatch, commit}, searchTerm){
            this.state.characters.page = 1
            commit('SET_SEARCH_TERM', searchTerm)
            dispatch('GET_CHARACTERS_FROM_API')
        },
    },
    getters:{
        CHARACTERS: state => state.characters,
        COUNTS: state => state.counts,
        STATUS: state => state.status,
        SEARCH: state => state.searchTerm,
        ID: state => id => state.characters.find(character => character.id === id),
        LOADED: state => state.isLoaded
    },
    namespaced: true
}

export default characters



