<template>
  <div class="card">
    <div class="card-header text-center">
      <h2> Formulario de películas </h2>
      </div>
    <div class="card-body">
      <p v-if="errors.length">
    <b>Todos los campos son requeridos:</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
      <form class="row" @submit="checkForm">
        <div class="form-group col-12">
          <label >Titulo</label>
          <input type="text" class="form-control" v-model="title">          
        </div>
        <div class="form-group col-12">
          <label >Descripción</label>
          <textarea class="form-control"  rows="6" v-model="description"></textarea>   
        </div>
        <div class="form-group col-6">
          <label >Duración</label>
          <input type="number" class="form-control" v-model="duration">          
        </div>
        <div class="form-group col-6">
          <label >Fecha de estreno</label>
          <input type="date" class="form-control" v-model="premiere_date">          
        </div>
        <div class="form-group col-12">
          <label >Url de la Portada</label>
          <input type="text" class="form-control" v-model="image_url">          
        </div>
        <div class="form-group col-12">
          <label >Url del Video</label>
          <input type="text" class="form-control" v-model="trailer_url">          
        </div>
        <div class="form-group col-12">
          <multiselect v-model="value" :options="categories_list" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Elíge una categoría" label="name" track-by="name" :preselect-first="true">
            <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Catgorías</span></template>
          </multiselect>
        </div>
       <div class="col-12">
 <button type="submit" class="btn btn-primary btn-block">Crear</button>
       </div>
       
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import FilmDataService from "../../services/filmService";
import CategoryDataService from "../../services/categoryService";

export default {
  name: "films-form",
  components: {
    Multiselect
  },
  data() {
    return {
      image_url: "",
      title: "",
      description: "",
      duration: "",
      trailer_url: "",
      premiere_date: "",
      categories: "",
      categories_list: [],
      value: [],
      errors: [],
    };
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      if (!this.image_url) {
        this.errors.push("La imagen es requerida.");
      }
      if (!this.title) {
        this.errors.push("El titulo es requerido.");
      }
      if (!this.description) {
        this.errors.push("La descripción es requerida.");
      }
      if (!this.duration) {
        this.errors.push("La duración es requerida.");
      }
      if (!this.trailer_url) {
        this.errors.push("El triler es requerido.");
      }
      if (!this.premiere_date) {
        this.errors.push("La fecha de estreno requerida.");
      }
      if (!this.value) {
        this.errors.push("Elige al menos una categoría.");
      }

      if (!this.errors.length) {
        let categories = this.value.map(val => val._id);
        FilmDataService.create({
          image_url:this.image_url,
          title:this.title,
          description:this.description,
          duration:this.duration,
          trailer_url:this.trailer_url,
          premiere_date:this.premiere_date,
          categories: categories
        });
      }

      e.preventDefault();
    },
    retrieveCategories() {        
        CategoryDataService.getAll()
        .then(response => {
          this.categories_list = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveCategories();
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control {
    display: block;
    width: 100%;
    height: 0;
    padding: 1rem 0;
    font-size: .8125rem;
    font-weight: 400;
    line-height: 1.5;
    color: #666;
    background-color: transparent;
    background-clip: padding-box;
    border: 0 solid transparent;
    border-radius: 0;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>
