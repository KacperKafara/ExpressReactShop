<template>
    <div class="container mt-5">
        <h1>Filmy według obsady</h1>
        <!-- <ul v-for="[key, value] of Object.entries(moviesByGenres())" :key="key"> -->
        <ul v-for="(value, key) in moviesByActors()" :key="key">
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
            // this.allActors = lodash.uniqBy(this.array, (e) => e.cast)
            lodash.forEach(this.array, ((element) => {
                // let unique = lodash.filter(element.cast, (item) => {
                //     return this.allActors.indexOf(item) === -1
                // });
                let unique = lodash.difference(element.cast, this.allActors);
                this.allActors = lodash.concat(this.allActors, unique);
            }))
            let sortedActors = {};
            lodash.forEach(this.allActors, (actor => {
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
            return sortedActors;
        }
    },
    data() {
        return {
            allActors: ref([]),
        }
    }

}
</script>

<style>
h1 {
    text-align: center;
}
</style>