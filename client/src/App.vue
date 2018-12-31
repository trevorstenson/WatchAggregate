<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <ListingComponent v-for="listing in listings" :entry="listing"/>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import ListingComponent from './components/ListingComponent.vue'
    import axios from 'axios'

    const API_URL = 'http://localhost:3000/listings/';

    export default {
        name: 'app',
        components: {
            HelloWorld, ListingComponent
        },
        data() {
            return {
                listings: []
            }
        },
        methods: {
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
        margin-top: 60px;
    }
</style>
