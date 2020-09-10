<template>
<div>
 <v-app-bar
      app
      color="primary"
      dark
      bottom
    >
     <v-spacer></v-spacer>

      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-app-bar>
</div>
</template>
<script>   
    export default {    
      name: "app-footer",    
      computed: {
      },
      methods: {
        logout: function() {
          
        },
        viewAccount(){
          
        },
      },
      data() {  
        return {
          icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ]
        }  
      }    
    }
</script>


