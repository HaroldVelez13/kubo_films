import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/peliculas",
      name: "peliculas",
      component: () => import("../components/films/FilmList")
    },
    {
      path: "/peliculas/crear",
      name: "pelicula-crear",
      component: () => import("../components/films/FilmForm")
    },
    {
      path: "/peliculas/editar/:id",
      name: "pelicula-crear",
      component: () => import("../components/films/FilmForm")
    },
    {
      path: "/peliculas/:id",
      name: "pelicula-detalle",
      component: () => import("../components/films/FilmDetail")
    }
  ]
});