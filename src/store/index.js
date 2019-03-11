import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{ // data
        token: '',
        value_modal: '1',
        selected: ''
    },
    mutations: { //methods
        setToken(state,token){
            state.token = token;
        },
        selectModalCategory(state,value_modal){
            state.value_modal = value_modal;
        },
        selectAlign(state,selected){
            state.selected = selected;
        },
    },
    //getters , actions
})

