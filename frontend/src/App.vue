<template>
  <div id="app ">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Peliculas</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item"><!-- 
          <router-link to="/tutorials" class="nav-link">Tutorials</router-link> -->
        </li>
        <li class="nav-item">
          <router-link to="/peliculas/crear" class="nav-link">Nueva Pelicula</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3 ">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
