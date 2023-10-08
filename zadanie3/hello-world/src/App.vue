<template>
  <SearchComponent />
  <MoviesTable />
  <ListByGenre />
  <ListByCast />
</template>

<script>
import SearchComponent from './components/SearchComponent.vue'
import MoviesTable from './components/MoviesTable.vue'
import ListByGenre from './components/ListByGenre.vue'
import ListByCast from './components/ListByCast.vue'

export default {
  name: 'App',
  components: {
    SearchComponent,
    MoviesTable,
    ListByGenre,
    ListByCast
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
