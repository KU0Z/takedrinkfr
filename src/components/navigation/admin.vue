<template>
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.id" @click="$router.push(item.to)" >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>  
</template>
<script>    
    export default {    
      name: "navigationAdmin",        
      data() {  
        return {
          drawer: false,
          items: [
            {              
              id:0,
              title: 'home',
              icon: 'fa-home',
              to: '/home'
            },
            {              
              id:1,
              title: 'Usuario',
              icon: 'fa-box-open',
              to: '/product'
            },
            { 
              id:3,
              title: 'Mylista',
              icon: 'fa-users',
              to: '/users'
            }
                   
          ] 
        }  
      }    
    }
</script>
