<template>
    <div class="container mt-5">
        <h1>Filmy według obsady</h1>
        <!-- <ul v-for="[key, value] of Object.entries(moviesByGenres())" :key="key"> -->
        <ul v-for="(value, key) in sortedMovies" :key="key">
            <h4>{{ key }}</h4>
            <ol>
                <li v-for="(movie, index) of value" :key="index"> {{ movie.title }} </li>
            </ol>
        </ul>
        <!-- <p> All: {{ allActors }}</p> -->
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
        moviesByActors() {
            let startTime = new Date();
            let allActors = [];
            // this.allActors = lodash.uniqBy(this.array, (e) => e.cast)
            lodash.forEach(this.array, ((element) => {
                // let unique = lodash.filter(element.cast, (item) => {
                //     return this.allActors.indexOf(item) === -1
                // });
                let unique = lodash.difference(element.cast, allActors);
                allActors = lodash.concat(allActors, unique);
            }))
            let sortedActors = {};
            lodash.forEach(allActors, (actor => {
                sortedActors[actor] = [];
            }))
            lodash.forEach(this.array, element => {
                if (element.cast != '') {
                    lodash.forEach(element.cast, actor => {
                        sortedActors[actor].push(element);
                    })
                }
            })
            // lodash.forEach(this.allActors, (actor => {
            //     sortedActors[actor] = lodash.filter(this.array, (element) => {
            //         return lodash.includes(element.cast, actor);
            //     })
            // }))
            // console.log(sortedActors)
            let endTime = new Date();
            console.log("cast time: " + (endTime - startTime));
            return sortedActors;
        }
    },
    data() {
        return {
            sortedMovies: ref([]),
        }
    },
    mounted() {
        this.sortedMovies = this.moviesByActors();
    }

}
</script>

<style>
h1 {
    text-align: center;
}
</style>