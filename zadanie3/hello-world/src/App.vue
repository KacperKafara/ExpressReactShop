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
* {
  font-family: sans-serif;
}

h1 {
  text-align: left;
}
</style>
