<template>
 <div class="card mb-3" >
  <div class="row no-gutters">
    <div class="col-md-4">
      <img :src="film.image_url" class="card-img" :alt="film.title">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">
            {{film.title}} 
            <small class="badge badge-info float-right" v-if="isNew(film.premiere_date)">Estreno</small>
            </h5>
        <p class="card-text">{{film.description.substring(0,300)+".." }}</p>
        <p class="card-text float-right"><small class="text-muted">{{moment(film.premiere_date).locale('es').format('LL')}}</small></p>
      </div>      
    </div>
    <div class="card-footer col-12">
        <span class="card-text mx-3 text-muted float-right"  
          v-for="(categoryId, index) in film.categories"
          :key="index">
          <span v-if="categoryId">{{getCategoryName(categoryId)}}</span>
            
        </span>
      </div>
  </div>
</div>

</template>

<script>
import moment from 'moment'

export default {
  name: 'FilmItem',  
  props: {
    film: {},
    categories: {}
  },
  methods: {
      moment(...args) {
        return moment(...args);
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>