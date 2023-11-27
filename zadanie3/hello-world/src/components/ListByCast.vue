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
            let allActors = [];
            lodash.forEach(this.array, ((element) => {
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
            lodash.forEach(sortedActors, (movies, actor) => {
                sortedActors[actor] = lodash.sortBy(movies, 'title');
            });
            const sortedActorsArray = lodash.sortBy(Object.keys(sortedActors));
            const sortedActorsObject = {};
            sortedActorsArray.forEach((actor) => {
                sortedActorsObject[actor] = sortedActors[actor];
            });

            return sortedActorsObject;
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