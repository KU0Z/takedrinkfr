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
      
    </v-toolbar>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-card-title v-text="card.price">{{card.price}}</v-card-title>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-delete</v-icon>
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
        cards: [
        { price: 10, title: 'Gallo', src: 'https://www.estrategiaynegocios.net/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=CBhMWywFctVLduxdaVhhmc$daE2N3K4ZzOUsqbU5sYtVrqv4aj8No4ChKgGIpdsg6FB40xiOfUoExWL3M40tfzssyZqpeG_J0TFo7ZhRaDiHC9oxmioMlYVJD0A$3RbIiibgT65kY_CSDiCiUzvHvODrHApbd6ry6YGl5GGOZrs-&amp;CONTENTTYPE=image/jpeg', flex: 3 },
        { price: 35, title: 'Guinnes', src: 'https://m.eltiempo.com/uploads/2020/05/28/5ed06cee78eab.jpeg', flex: 3 },
        { price: 33, title: 'Fuller´s Black Cab Stout', src: 'https://www.elbunkker.com.uy/wp-content/uploads/2019/08/Cerveza-Fuller%C2%B4s-Black-Cab-Stout-500ml-Pack-12-Unidades-3.jpg', flex: 3 },
        { price: 25, title: 'Fuller`s London Pride', src: 'https://br-info.beer/im/fuller_s_london_pride1.jpg.pagespeed.ce.0okrW8Gh4t.jpg', flex: 3 },
      ],
      }
    },
    methods: {
        editItem (item) {
        this.$router.push('/songs/'+item );
      },
      goToForm(){
        this.$router.push({path: '/product/add'});
      },
      
    }
  }
</script>