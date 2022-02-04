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
            axios.get(`https://rickandmortyapi.com/api/character/?page=${this.state.characters.page}`)
            .then(characters => {
                commit('SET_CHARACTERS', characters.data.results)
                commit('SET_COUNTS', characters.data.info.count)
            })
            .catch(err => console.log(err))
            .finally(() => this.state.characters.isLoaded = false)
        },
        CHANGE_PAGE({dispatch, commit}, pageNum){
            commit('SET_PAGE', pageNum)
            if(this.state.characters.status && this.state.characters.searchTerm){
                dispatch('GET_CHARACTERS_SEARCH_STATUS_FROM_API')
            } else if(this.state.characters.status){
                dispatch('GET_STATUS_CHARACTERS_FROM_API')
            } else if(this.state.characters.searchTerm){
                dispatch('SEARCH_CHARACTERS_FROM_API')
            } else {
                dispatch('GET_CHARACTERS_FROM_API')
            }
        },
        GET_STATUS_CHARACTERS_FROM_API({dispatch, commit}){
            if(this.state.characters.status !== 'All'){
                this.state.characters.isLoaded = true
                axios.get(`https://rickandmortyapi.com/api/character/?page=${this.state.characters.page}&status=${this.state.characters.status}`)
                .then(characters =>{
                    commit('SET_COUNTS', characters.data.info.count)
                    commit('SET_STATUS_CHARACTERS', characters.data.results)
                    
                })    
                .finally(() => this.state.characters.isLoaded = false)
            } else {
                dispatch('GET_CHARACTERS_FROM_API')
            }
        },
        CHANGE_STATUS({dispatch, commit}, status){
            this.state.characters.page = 1
            commit('SET_STATUS', status)
            dispatch('GET_STATUS_CHARACTERS_FROM_API')
        },
        SEARCH_CHARACTERS_FROM_API({dispatch, commit}){
            if(this.state.characters.searchTerm){
                this.state.characters.isLoaded = true
                axios.get(`https://rickandmortyapi.com/api/character/?page=${this.state.characters.page}&name=${this.state.characters.searchTerm}`)
                .then(characters =>{
                    commit('SET_SEARCH_CHARACTERS', characters.data.results)
                    commit('SET_COUNTS', characters.data.info.count)
                    console.log(characters.data.results)
                }) 
                .finally(() => this.state.characters.isLoaded = false)   
            } else {
                dispatch('GET_CHARACTERS_FROM_API')
            }
        },
        SEARCH_TERM({dispatch, commit}, searchTerm){
            this.state.characters.page = 1
            commit('SET_SEARCH_TERM', searchTerm)
            dispatch('SEARCH_CHARACTERS_FROM_API')
        },
        GET_CHARACTERS_SEARCH_STATUS_FROM_API({dispatch, commit}){
            if(this.state.characters.status && this.state.characters.searchTerm){
                this.state.characters.isLoaded = true
                axios.get(`https://rickandmortyapi.com/api/character/?page=${this.state.characters.page}&name=${this.state.characters.searchTerm}&status=${this.state.characters.status}`)
                .then(characters =>{
                    commit('SET_COUNTS', characters.data.info.count)
                    commit('SET_SEARCH_STATUS_CHARACTERS', characters.data.results)
                })
                .finally(() => this.state.characters.isLoaded = false)
            } else {
                dispatch('GET_CHARACTERS_FROM_API')
            }
        }
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