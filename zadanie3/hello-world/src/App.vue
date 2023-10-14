<template>
  <SearchComponent @title-response="(e) => title = e" />
  <MoviesTable :array="arr" @display-more="(len) => { if (len < 100) { displayMoreMovies() } }" />
  <ListByGenre />
  <ListByCast />
  <h1>{{ title }}</h1>
</template>

<script>
import SearchComponent from './components/SearchComponent.vue'
import MoviesTable from './components/MoviesTable.vue'
import ListByGenre from './components/ListByGenre.vue'
import ListByCast from './components/ListByCast.vue'
import lodash from 'lodash'
import { ref } from 'vue'
import json from "./resources/movies.json"

export default {
  name: 'App',
  components: {
    SearchComponent,
    MoviesTable,
    ListByGenre,
    ListByCast,

  },
  data() {
    return {
      arr: ref(lodash.sampleSize(json, 10)),
      title: ref('title'),
    }
  },
  methods: {
    displayMoreMovies() {
      let newArray = lodash.concat(this.arr, lodash.sampleSize(json, 10));
      while (lodash.uniq(newArray).length % 10 != 0) {
        newArray = lodash.concat(newArray, lodash.sampleSize(json, lodash.uniq(newArray) % 10));
      }
      this.arr = newArray;
    }
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
