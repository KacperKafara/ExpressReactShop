<template>
    <div class="container">
        <table class="table table-striped mt-5">
            <thead class="table-dark">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Year</th>
                    <th scope="col">Cast</th>
                    <th scope="col">Genres</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(movie, index) of array" :key="index">
                    <td>{{ movie.title }}</td>
                    <td>{{ movie.year }}</td>
                    <td>
                        <ul>
                            <li v-for="(actor, index) of movie.cast" :key="index">{{ actor }}</li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li v-for=" (genre, index) of movie.genres" :key="index">{{ genre }}
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="$emit('display-more', array.length)">Dsiplay more ({{ array.length }}/ {{ arrLen }})</button>
    </div>
</template>

<script>
export default {
    props: {
        array: Array,
        arrLen: Number,
    },
}
</script>

<style>
h1 {
    text-align: center;
}
</style>