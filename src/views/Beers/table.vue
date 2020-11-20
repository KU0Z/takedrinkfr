<template>
  <div>
    <v-toolbar flat dark >
      <v-toolbar-title>  {{ dataTitle }}</v-toolbar-title>     
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="goToForm()" >create</v-btn>
      
    </v-toolbar>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.name"
          cols="3"
        >
          <v-card>
            <v-img
              :src="card.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.name"></v-card-title>
            </v-img>
              <v-card-text>
      
                <div>{{card.description}}</div>
              </v-card-text>
              <v-card-actions>
               <v-card-title>
              Cerveza
            </v-card-title>

            <v-card-subtitle>
              {{contries[card.type].name}}
            </v-card-subtitle>
                </v-card-actions>
              <v-card-actions>
             <v-card-title>
              Tipo
            </v-card-title>

            <v-card-subtitle>
              {{types[card.type].name}}
            </v-card-subtitle>
                </v-card-actions>
            <v-card-actions>

              
              
              <v-card-title >Q{{card.price.$numberDecimal}}</v-card-title>
              <v-divider class="mx-4"></v-divider>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon @click="deleteBeers(card._id)">mdi-delete</v-icon>
              </v-btn>
              <v-btn  @click="editItem(card._id)" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>



            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
    </v-container>                            
  </div>
</template>

<script>
  export default {
    props:{
      dataTitle: String,
      dataHeaders: Array,
      dataTable: Array,
      dataPath: String
    },
    data(){
      return {
        search: '',
        contries: [{ name: 'Guatemala', value: 1 }, 
      { name: 'Alemania', value: 2 },
      { name: 'Inglaterra', value: 3 }, 
      { name: 'Irlanda', value: 4 },],
      type: 0,
      types: [{ name: 'Lager', value: 1 }, 
      { name: 'Ale', value: 2 },
      { name: 'Rubia', value: 3 }, 
      { name: 'Stout ', value: 4 },],
        cards: [
        { price: 10, title: 'Gallo', src: 'https://www.estrategiaynegocios.net/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=CBhMWywFctVLduxdaVhhmc$daE2N3K4ZzOUsqbU5sYtVrqv4aj8No4ChKgGIpdsg6FB40xiOfUoExWL3M40tfzssyZqpeG_J0TFo7ZhRaDiHC9oxmioMlYVJD0A$3RbIiibgT65kY_CSDiCiUzvHvODrHApbd6ry6YGl5GGOZrs-&amp;CONTENTTYPE=image/jpeg', flex: 3 },
        { price: 35, title: 'Guinnes', src: 'https://m.eltiempo.com/uploads/2020/05/28/5ed06cee78eab.jpeg', flex: 3 },
        { price: 33, title: 'Fuller´s Black Cab Stout', src: 'https://www.elbunkker.com.uy/wp-content/uploads/2019/08/Cerveza-Fuller%C2%B4s-Black-Cab-Stout-500ml-Pack-12-Unidades-3.jpg', flex: 3 },
        { price: 25, title: 'Fuller`s London Pride', src: 'https://br-info.beer/im/fuller_s_london_pride1.jpg.pagespeed.ce.0okrW8Gh4t.jpg', flex: 3 },
      ],
      }
    },
    created() {
      this.loadBeers()


    },
    methods: {
        editItem (item) {
        this.$router.push('/beer/edit/'+item );
      },
      goToForm(){
        this.$router.push( '/beer/add');
      },
      deleteBeers(id){
        let self=this
        this.axios.delete('beers/'+id)
          .then((res) => {            
              
              this.loadBeers()
             
          })
          .catch((err) => {
             console.error(err)
  
          })

      },
      loadBeers(){
        let self=this
        this.axios.get('beers')
          .then((res) => {            
              
              console.log(res)
              this.cards=res.data
              array.forEach(element => {
                
              });
             
          })
          .catch((err) => {
             console.error(err)
  
          })

      }
      
    }
  }
</script>

<style >
.v-card__title{
  padding-bottom: 0;
  padding-top: 0;
}
.v-card__subtitle{
  padding-bottom: 0;
  padding-top: 18px !important;
}
</style>