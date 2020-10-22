<template>   
      <div v-if="currentFilm" class="row mt-5">
        <h1 class="col-12 text-center mb-3">{{ currentFilm.title }} </h1>
        <div class="col-12">
            <h4>
                <strong class="badge badge-info" v-if="isNew(currentFilm.premiere_date)"> Estreno </strong>
            </h4>
            <p>
                <strong>Fecha Estreno:</strong>
                <span> {{moment(currentFilm.premiere_date).locale('es').format('LL')}}</span>
                
            </p>
            
            
        </div>
        <div class="col-12 mb-3">
            <strong>Generos: </strong>
        <span class="card-text mx-1 text-muted "  
          v-for="(categoryId, index) in currentFilm.categories"
          :key="index">
          <span v-if="categoryId">{{getCategoryName(categoryId)}}</span>
            
        </span>
      </div>
        
        <div class="col-12 mb-1">
            <p>
          <strong>Descripcion:</strong> {{ currentFilm.description }}

            </p>
        </div>
        <div class="col-12 mb-4">
            <router-link  type="button" class="btn  btn-sm btn-outline-warning" to="'/peliculas/editar/' + currentFilm._id">Editar</router-link >
        </div>
        <div class="col-10 w-75" v-if="youtubeId">
            <youtube :video-id="youtubeId" ></youtube>
        </div>
        
          
        

      </div>
      <div v-else class="text-center mt-5">
        <br />
        <h2><strong>Selecciona una Película  para ver su detalle...</strong> </h2>
      </div>
</template>

<script>
import moment from 'moment'
import  { getIdFromUrl } from 'vue-youtube';


export default {
  name: 'FilmDetail',  
  props: {
    currentFilm: {},
    categories: {}
  },
  data() {
    return {
      youtubeId: null,
    };
  },
  methods: {
      moment(...args) {
        return moment(...args);
    },
    getId (id) {
        this.youtubeId = getIdFromUrl(id)
    },
  getCategoryName(id){
      let category = this.categories.find(category => category._id===id )
      if (category) return category.name
      
  },
  isNew(premiere_date){
        let premier = moment(premiere_date);
        let now = moment(Date.now());
        let days = now.diff(premier, 'days') // 1
        console.log(days)
        return days<15?true:false;
  }
  },
  updated(){
        let vm = this;
        let id = vm.currentFilm.trailer_url
        this.getId(id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
