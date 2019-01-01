<template>
    <div id="app">
        <div id="listings">
            <ListingComponent v-for="listing in paginatedData" :entry="listing"/>
        </div>
        <div id="buttonBar">
            <button v-on:click="prevPage">Prev Page</button>
            <button v-on:click="nextPage">Next Page</button>
        </div>
    </div>
</template>

<script>
    import ListingComponent from './components/ListingComponent.vue'
    import axios from 'axios'

    const API_URL = 'http://localhost:3000/listings/';

    export default {
        name: 'app',
        components: {
            ListingComponent
        },
        data() {
            return {
                listings: [],
                pageNumber: 0,
                size: 22
            }
        },
        computed: {
            paginatedData() {
                const start = this.pageNumber * this.size,
                    end = start + this.size;
                return this.listings.reverse().slice(start, end);
            }
        },
        methods: {
            nextPage() {
                this.pageNumber++;
                console.log(this.pageNumber);
            },
            prevPage() {
                this.pageNumber--;
                console.log(this.pageNumber);
            },
            pageCount() {
                let l = this.listings.length,
                    s = this.size;
                return Math.ceil(l/s);
            },
            getListings() {
                axios
                    .get(API_URL)
                    .then((response) => {
                        this.listings = response.data;
                    })
                    .catch((error) => {
                        throw error;
                    })

            }
        },
        mounted() {
            this.getListings();
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: darkslateblue;
    }
</style>
