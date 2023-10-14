<template>
    <div class="container mt-5">
        <h1>Filmy według gatunku</h1>
        <!-- <ul v-for="[key, value] of Object.entries(moviesByGenres())" :key="key"> -->
        <ul v-for="(value, key) in sortedMovies" :key="key">
            <h4>{{ key }}</h4>
            <ol>
                <li v-for="(movie, index) of value" :key="index"> {{ movie.title }} </li>
            </ol>
        </ul>
    </div>
</template>

<script>
import lodash from 'lodash'
import { ref } from 'vue';

export default {
    props: {
        array: Array,

    },
    methods: {
        moviesByGenres() {
            let allGenres = [];
            this.array.forEach((element) => {
                let unique = lodash.difference(element.genres, allGenres);
                allGenres = lodash.concat(allGenres, unique);
            })
            let sortedGenres = {};
            lodash.forEach(allGenres, (genre => {
                sortedGenres[genre] = [];
            }))
            lodash.forEach(this.array, element => {
                if (element.genres != '') {
                    lodash.forEach(element.genres, genre => {
                        sortedGenres[genre].push(element);
                    })
                }

            })
            return sortedGenres;
        }
    },
    data() {
        return {

            sortedMovies: ref([]),
        }
    },
    mounted() {
        this.sortedMovies = this.moviesByGenres();
    }

}
</script>

<style>
h1 {
    text-align: center;
}
</style>