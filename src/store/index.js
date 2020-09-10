import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {


    counter:0,
    autenticate:localStorage.getItem('autenticate')===null ? false : true,
    LastName: localStorage.getItem('LastName'),
    ModifiedDateTime: localStorage.getItem('ModifiedDateTime'),
    Name: localStorage.getItem('Name'),
    UserId: localStorage.getItem('UserId'),
    user:[],
    api:'http://localhost:8080/',
    musicPlaylist: [
			{
				SongName: "SALES",
				Autor: "Chinese New Year",
				Preview: "https://p.scdn.co/mp3-preview/94f073d31911daf84b2fdf6ebba974be34ad3682?cid=774b29d4f13844c495f206cafdad9c86",
				Image: "https://i.scdn.co/image/ab67616d00004851d02b1395430c5879e5a5ef7c"
			},
			{
				SongName: "Airwolf",
				Autor: "Lose the Lazy",
				Preview: "https://p.scdn.co/mp3-preview/6e452978591913bd2b63c54ee4e9a684e4594171?cid=774b29d4f13844c495f206cafdad9c86",
				Image: "https://i.scdn.co/image/ab67616d00004851cdbf6e524dcfb37106583164"
			},
			{
				SongName: "Lewis Del Mar",
				Autor: "Painting (Masterpiece)",
				Preview: "https://p.scdn.co/mp3-preview/862cb96402d381a5cfc6e4ad9e94a5d179394cd7?cid=774b29d4f13844c495f206cafdad9c86",
				Image: "https://i.scdn.co/image/ab67616d00001e0211555ed45c4377e101d7979d"
			},
			{
				SongName: "Young Rising Sons",
				Autor: "High",
				Preview: "https://p.scdn.co/mp3-preview/6492ce0058381278ac4e239f3f8843d7dbbf3cd1?cid=774b29d4f13844c495f206cafdad9c86",
				Image: "https://i.scdn.co/image/ab67616d00004851f2a45f258f01bbd1a0e77bbc"
			}
		]
    
  },
  mutations: {
    CHANGELIST: function(state,list){
      
      state.musicPlaylist=list

    },
    AUTHICATE: function(state,paiload){
      
      state.autenticate=true,
      state.LastName=paiload.LastName,
      state.ModifiedDateTime=paiload.ModifiedDateTime,
      state.UserId=paiload.UserId,
      state.Name=paiload.Name
      localStorage.setItem('autenticate',state.autenticate)
      localStorage.setItem('LastName',state.LastName)
      localStorage.setItem('ModifiedDateTime',state.ModifiedDateTime)
      localStorage.setItem('UserId',state.UserId)
      localStorage.setItem('Name',state.Name)
      router.push({name:'Home'})
    },
      CLOSE: function(state){
      state.autenticate=false,
      localStorage.removeItem('autenticate')
      localStorage.removeItem('LastName')
      localStorage.removeItem('ModifiedDateTime')
      localStorage.removeItem('UserId')
      localStorage.removeItem('Name')
      router.push({name:'Login'})
    }
  },
  actions: {
    AUTH: function({commit},paiload) {
      
      commit('AUTHICATE', paiload);
      },
    LOGOUT: function({commit}) {
      
      commit('CLOSE');
      },
      PLAYLIST: function({commit},list) {
      
        commit('CHANGELIST',list);
      }
  
  

  },
  modules: {
  },
  getters: {
    musicPlaylisted: function(state) {
      return state.musicPlaylist
    },
    userautenticate: function(state) {
      return state.autenticate
    }
  }

})
