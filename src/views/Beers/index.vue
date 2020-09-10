<template>
  <div>
    <table-recomendations :dataTable="recommendation" :dataHeaders="headers" :dataTitle="title" :dataPath="path" >
    </table-recomendations>
  </div>
</template>

<script>  
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

      this.axios.get('auth/recommendation?userId='+this.$store.state.UserId+'&recommendationId=0')
      .then(function(r){
        self.recommendation = r.data
        
      })
      .catch(function(r){
        self.recommendation = []
      })
    },
    methods: {
    }
  }
</script>