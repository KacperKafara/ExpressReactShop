<template>
  <SearchComponent @searchFilter="(filters) => filterMovies(filters)" />
  <MoviesTable :array="displayArr" @display-more="(len) => { if (len < arr.length) { displayMoreMovies() } }" />
  <ListByGenre :array="randomArray" />
  <ListByCast :array="randomArray" />
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
      displayArr: ref(lodash.sampleSize(json, 10)),
      arr: lodash.sampleSize(json, 100),
      randomArray: lodash.sampleSize(json, 100),
    }
  },
  methods: {
    displayMoreMovies() {
      let remaining = this.arr.length - this.displayArr.length >= 10 ? 10 : this.arr.length - this.displayArr.length
      let newArray = lodash.concat(this.displayArr, lodash.slice(this.arr, this.displayArr.length, this.displayArr.length + remaining));
      this.displayArr = newArray;
    },
    filterMovies(filters) {
      this.arr = lodash.filter(json, (value) => {
        return value.title.toLowerCase().includes(filters.title.toLowerCase()) &&
          (filters.yearStart <= value.year && filters.yearEnd >= value.year) &&
          this.listContainsCaseInsensitive(value.cast, filters.cast);
      })
      lodash.remove(this.displayArr, true);
      this.displayArr = lodash.slice(this.arr, 0, this.arr.length >= 10 ? 10 : this.arr.length);
    },
    listContainsCaseInsensitive(list, value) {
      if (value === '') {
        return true;
      }
      return lodash.some(list, (element) => {
        return element.toLowerCase().includes(value.toLowerCase());
      })
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
