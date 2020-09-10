<template>
  <v-container fluid fill-height ma-0 pa-0>
    <v-layout row fill-height>
      <v-flex hidden-sm-and-down md8 lg8 xl8 align-center justify-center fill-height >
           <v-img src="https://picsum.photos/510/300?random" style="height:100vh !important"></v-img>
      </v-flex> 
      <v-flex xs12 sm12 md4 lg4 xl4 fill-height>
        <v-card class="pa-6 fill-height">
          <div class="text-right">
            <div class="display-2" style="margin: 18vh auto 0 auto;">Log In</div>                                  
          </div>          
          <v-card-text>
                <v-form>
                    <v-text-field
                        v-model="userName"
                        label="E-mail"
                        name="login"
                        prepend-icon="mdi-at"
                        type="text"
                    ></v-text-field>

                    <v-text-field
                    v-model="password"
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                    ></v-text-field>
                </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="primary" @click="login()" >Acceso</v-btn>
            <div>
                
            </div>
            
          </v-card-actions>
          <v-card-text >
            <router-link to="/register" class="btn btn-link">Register</router-link>
          </v-card-text>
        </v-card>        
      </v-flex>
                     
    </v-layout>
  </v-container>
</template>
<script>
  import axios from 'axios';
  export default {
    data () {
      return {
      maintenance: false,
      process: false,      
      drawer: null,
      name: '',
      lastName: '',
      userName: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'Correo requerido',
        v => /.+@.+/.test(v) || 'El correo debe ser válido'
      ],
      email: "",
      password: "",
      error: false,
      wallpaper:"",
      wallpaperVideo: null,
      wallpaperReady: false
      }
    },
    created: function () {

  },
  mounted:function (){
  },
    methods: {
     login() {
        let endpoint = 'http://localhost:8080/account/authentication'
        let payload = {
          
              UserName :this.userName,
              Password :this.password
          
        }
        let options = {
            headers: { 

                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
          };

        let self=this
        this.axios.post('auth/account/authentication',payload)
          .then((res) => {            
              self.axios.get('auth/user?userId='+res.data.UserId)
                .then((res) => {
                    console.log(res.data)
                    this.$store.dispatch('AUTH',res.data)
                  
                })
                .catch((err) => {
                  console.error(err)
        
                })
              this.$store.dispatch('AUTH',res.data.UserId)
             
          })
          .catch((err) => {
             console.error(err)
  
          })
      }
    }
  }
</script> 