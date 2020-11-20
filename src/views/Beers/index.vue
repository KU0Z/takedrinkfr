<template>
  <div>
    <table-recomendations :dataTable="recommendation" :dataHeaders="headers" :dataTitle="title" :dataPath="path" >
    </table-recomendations>
  </div>
</template>

<script>  
  import axios from'axios'  
  import tableRecomendations from '@/views/Beers/table.vue'  
  export default {
    name: 'recomendations',
    components:{
      tableRecomendations,
    },
    data() {
      return {
        title:"Beers",      
      recommendation: [],
        headers: [
          { text: 'Estado', value: 'Mood', sortable: false },     
          { text: ' Porcentage', value: 'Percentage' },
          { text: '', value: 'action', sortable: false }
        ],
        path: '/songs'
      }
    },
    created () {
      var self = this
      axios.get('https://6nlk8s2xu7.execute-api.us-west-1.amazonaws.com/dev/api/v1/users')
      .then(function(r){
        self.recommendation = r.data
        
      })
      .catch(function(r){
        self.recommendation = []
      })
    },
    edit(id) {
        this.$router.push({
                path: '/beer/edit/' + id
            });

        },

    methods: {
    }
  }
</script>