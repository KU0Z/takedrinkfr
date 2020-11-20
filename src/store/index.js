import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {


    counter:0,
    autenticate:localStorage.getItem('autenticate')===null ? false : true,
    //LastName: localStorage.getItem('LastName'),
    //ModifiedDateTime: localStorage.getItem('ModifiedDateTime'),
    photoURL: localStorage.getItem('photoURL'),
    email: localStorage.getItem('email'),
    emailVerified: localStorage.getItem('emailVerified'),
    Name: localStorage.getItem('Name'),
    UserId: localStorage.getItem('UserId'),
    user:[],
    api:'http://localhost:8080/',

    
  },
  mutations: {
    CHANGELIST: function(state,list){
      
      state.musicPlaylist=list

    },
    AUTHICATE: function(state,paiload){
      state.autenticate=true,
      //state.LastName=paiload.LastName,
      //state.ModifiedDateTime=paiload.phoneNumberModifiedDateTime,
      state.UserId=paiload.uid,
      state.Name=paiload.displayName
      state.photoURL=paiload.photoURL
      state.email=paiload.email
      state.emailVerified=paiload.emailVerified
      localStorage.setItem('autenticate',state.autenticate)
      //localStorage.setItem('LastName',state.LastName)
      localStorage.setItem('photoURL',state.photoURL)
      localStorage.setItem('email',paiload.email)
      localStorage.setItem('emailVerified',state.emailVerified)
      localStorage.setItem('UserId',state.UserId)
      localStorage.setItem('Name',state.Name)
      router.push({name:'Home'})
    },
      CLOSE: function(state){
      state.autenticate=false,
      localStorage.removeItem('autenticate')
      //localStorage.removeItem('LastName')
      localStorage.removeItem('ModifiedDateTime')
      localStorage.removeItem('UserId')
      localStorage.removeItem('Name')
      router.push({name:'Login'})
    },
    CLOSED: function(state){
      state.autenticate=false,
      localStorage.removeItem('autenticate')
      localStorage.removeItem('LastName')
      localStorage.removeItem('ModifiedDateTime')
      localStorage.removeItem('UserId')
      localStorage.removeItem('Name')
      localStorage.removeItem('token')
      state.player.audio.pause();
      router.push({name:'Login'})
    },
    

  },
  actions: {
    AUTH: function({commit},paiload) {
      
      commit('AUTHICATE', paiload);
      },
    TOKEN: function({commit},paiload) {
      
        commit('ACCES', paiload);
        }, 
    LOGOUT: function({commit}) {
      
      commit('CLOSE');
      },


  },
  modules: {
  },
  getters: {
    getuuid: function(state) {
      return state.UserId
    },
    userautenticate: function(state) {
      return state.autenticate
    },
    Authenticated: function(state) {
      if (state.autenticate)
      {
          return true 

      }
      else
      {
        return false
      }
    },
  }
  

})
