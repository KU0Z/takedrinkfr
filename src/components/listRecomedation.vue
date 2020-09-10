<template>
  <div>
    <v-toolbar flat dark >
      <v-toolbar-title>{{ dataTitle.Type  }}  {{ dataTitle.Confidence }}</v-toolbar-title>     
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-btn  color="white" dark class="mb-2" v-on:click="playList(dataTable)"><v-icon
             dark
             big
             color='primary'
            
          >
             mdi-playlist-play
          </v-icon></v-btn>
      
    </v-toolbar>                            
    <v-data-table
      :headers="dataHeaders"
      :items="dataTable"
      hide-default-footer
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <tr style="padding-left: 0px !important;">
        <td >
          <v-icon
             dark
             color='green'
          >
             mdi-play
          </v-icon>
        </td>
        <td>{{ props.item.Image }}</td>    
        <td>{{ props.item.Autor }}</td>
        <td>{{ props.item.SongName }}</td>
        
        
        </tr>
      </template>
      <template v-slot:item.Image="{ item }">
        <v-img  max-height="50" max-width="50" :src="item.Image"  ></v-img>
    </template>
       <template v-slot:item.action="{ item }">
        <v-icon
             dark
             big
             color='green'
             @click="editItem(item.RecommendationId)"
          >
             mdi-play-circle
          </v-icon>
    </template>
      <template slot="no-data">
        <v-btn color="primary">Actualizar</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    props:{
      dataTitle: Object ,
      dataHeaders: Array,
      dataTable: Array,
      dataPath: String
    },
    data(){
      return {
        search: ''
      }
    },
    methods: {
      editItem (item) {
        this.$router.push({path: this.dataPath+'/'+item.id });
      },
      goToForm(){
        this.$router.push({path: '/product/add'});
      },
      playList(list){
        this.$store.dispatch('PLAYLIST',list)
      }
    }
  }
</script>