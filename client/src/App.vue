<template>
    <div id="app">
        <TopBar/>
        <div id="mainSection">
            <div id="listings">
                <ListingComponent id="mainList" v-for="listing in paginatedData" :entry="listing"/>
            </div>
        </div>
        <div id="buttonBar">
            <button v-on:click="prevPage">Prev Page</button>
            <span id="current">{{pageNumber}}</span>
            <button v-on:click="nextPage">Next Page</button>
        </div>
    </div>
</template>

<script>
    import TopBar from './components/TopBar.vue'
    import ListingComponent from './components/ListingComponent.vue'
    import axios from 'axios'

    import { eventBus } from "./main"

    const API_URL = 'http://localhost:3000/listings/';

    export default {
        name: 'app',
        components: {
            TopBar,
            ListingComponent
        },
        data() {
            return {
                listings: [],
                pageNumber: 1,
                size: 30
            }
        },
        computed: {
            //returns the correct list of data from the listings array for whichever page you are currently on
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
                if (this.pageNumber > 1) {
                    this.pageNumber--;
                }
                console.log(this.pageNumber);
            },
            pageCount() {
                let l = this.listings.length,
                    s = this.size;
                return Math.ceil(l/s);
            },
            //gets listings from the backend and sets the pages lsitings to the response
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
        },
        created() {
            eventBus.$on('newSearch', (searchTerm) => {
                axios
                    .post(API_URL, {
                        title: searchTerm
                    })
                    .then((response) => {
                        this.listings = response.data;
                    })
                    .catch((error) => {
                        throw error;
                    })
            });
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
        background-color: lightgray;
    }

    #mainSection {
        float: top;
        width: 100%;
    }

    #mainList {
        width: 75%;
        float: top;
    }

    #buttonBar {
        background-color: dimgray;
    }
    
    button {
        text-decoration: none;
        text-align: center;
        padding: 10px 20px;
        border: none;
        color: black;
        background-color: dimgray;
    }

    body, html {
        margin: 0;
        padding: 0;
    }
</style>