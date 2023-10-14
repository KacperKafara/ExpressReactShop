<template>
    <div class="container mt-5">
        <h1>Filmy według gatunku</h1>
        <!-- <ul v-for="[key, value] of Object.entries(moviesByGenres())" :key="key"> -->
        <ul v-for="(value, key) in moviesByGenres()" :key="key">
            <h4>{{ key }}</h4>
            <ol>
                <li v-for="(movie, index) of value" :key="index"> {{ movie.title }} </li>
            </ol>
        </ul>
        <p> All: {{ allGenres }}</p>
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
            this.array.forEach((element) => {
                // let unique = lodash.filter(element.genres, (item) => {
                //     return this.allGenres.indexOf(item) === -1
                // });
                let unique = lodash.difference(element.genres, this.allGenres);
                this.allGenres = lodash.concat(this.allGenres, unique);
            })
            let sortedGenres = {};
            // this.allGenres.forEach(genre => {
            //     sortedGenres[genre] = lodash.filter(this.array, (element) => {
            //         return element.genres.includes(genre);
            //     })
            // })
            lodash.forEach(this.allGenres, (genre => {
                sortedGenres[genre] = [];
            }))
            lodash.forEach(this.array, element => {
                if (element.genres != '') {
                    lodash.forEach(element.genres, genre => {
                        sortedGenres[genre].push(element);
                    })
                }

            })
            // console.log(sortedGenres)
            return sortedGenres;
        }
    },
    data() {
        return {
            allGenres: ref([]),
        }
    }

}
</script>

<style>
h1 {
    text-align: center;
}
</style>