<template>
  <div class="list container-fluid row">
    
       
    
    <div class="col-md-6">
        <div class="card mb-3">
            <div class="form-group mx-3">
                <input type="text" class="form-control " v-model="search" placeholder="Buscar Película Por Titulo...">
            </div>
        <div class="form-inline">
            <div class="form-group col-6">
                <label for="Select" class="text-muted mr-3">Genero:  </label>
                <select class="form-control" v-model="selected" id="Select">
                    <option value="0">Todas</option>
                    <option v-for="option in categories" v-bind:value="option._id" v-bind:key="option._id" >
                       <span >{{ option.name }} </span> 
                    </option>
                </select>
            </div>
        
      
             <div class="form-group form-check col-6">
                <input type="checkbox" class="form-check-input" id="checkbox" v-model="showNews">
                <label for="checkbox" class="text-muted">Solo estrenos </label>

            </div>
        </div>
      
           
        </div>
         
        <div class=" pointer"
          :class="{ active: index == currentIndex }"
          v-for="(film, index) in filmsList"
          :key="index"
          @click="setActiveFilm(film, index)"
        >
           <FilmItem v-bind:film="film" v-bind:categories="categories"></FilmItem>

        </div>
             
    </div>
    <div class="col-md-6">
            <FilmDetail  v-bind:currentFilm="currentFilm" v-bind:categories="categories"></FilmDetail>
        </div>
  </div>
</template>

<script>
import moment from 'moment'
import FilmDataService from "../../services/filmService";
import CategoryDataService from "../../services/categoryService";
import FilmItem from './FilmItem'
import FilmDetail from './FilmDetail'

export default {
  name: "films-list",
  components: {
    'FilmItem': FilmItem,
    "FilmDetail":FilmDetail
  },
  data() {
    return {
      films: [],
      categories: [],
      currentFilm: null,
      currentIndex: -1,
      title: "",
      search: "",
      selected:0,
      showNews:false
    };
  },
  methods: {
      moment(...args) {
        return moment(...args);
    },
    retrieveFilms() {
      FilmDataService.getAll()
        .then(response => {
          this.films = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        
        CategoryDataService.getAll()
        .then(response => {
          this.categories = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveFilms();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveFilm(film, index) {
      this.currentFilm = film;
      this.currentIndex = index;
    },
    isNew(premiere_date){
            let premier = moment(premiere_date);
            let now = moment(Date.now());
            let days = now.diff(premier, 'days') // 1
            console.log(days)
            return days<15?true:false;
    }
  },
  mounted() {
    this.retrieveFilms();
  },
  computed: {
    filmsList() {
      let films = this.films;
      let selected = this.selected;
      let showNews = this.showNews;
      if(showNews){
        films = films.filter(film => {
          return this.isNew(film.premiere_date)
        })
      }
      if(selected!=0){
        films = films.filter(film => {
          return film.categories.includes(selected.toLowerCase())
        })
      }
      return films.filter(film => {
        return film.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
};
</script>

<style>
.pointer{
    cursor: pointer;
}
</style>