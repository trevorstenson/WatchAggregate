<template>
    <div id="app">
        <TopBar/>
        <div id="mainSection">
            <div id="listings">
                <ListingComponent id="mainList" v-for="listing in paginatedData" :entry="listing"/>
            </div>
            <Navigation :page-number="pageNumber"/>
        </div>
    </div>
</template>

<script>
    import TopBar from './components/TopBar.vue'
    import Navigation from './components/Navigation.vue'
    import ListingComponent from './components/ListingComponent.vue'
    import axios from 'axios'

    import { eventBus } from "./main"
    import BButton from "bootstrap-vue/src/components/button/button";
    import BButtonGroup from "bootstrap-vue/src/components/button-group/button-group";
    import BNavText from "bootstrap-vue/src/components/nav/nav-text";

    const API_URL = 'http://localhost:3000/listings/';

    export default {
        name: 'app',
        components: {
            BNavText,
            BButtonGroup,
            BButton,
            TopBar,
            ListingComponent,
            Navigation
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
                return this.listings.reverse().slice(start,  end);
            }
        },
        methods: {
            nextPage() {
                this.pageNumber++;
            },
            prevPage() {
                if (this.pageNumber > 1) {
                    this.pageNumber--;
                }
            },
            pageCount() {
                let l = this.listings.length,
                    s = this.size;
                return Math.ceil(l/s);
            },
            //gets listings from the backend and sets the pages listings to the response
            getListings() {
                axios
                    .get(API_URL)
                    .then((response) => {
                        this.listings = response.data;
                    })
                    .catch((error) => {
                        throw error;
                    })
            },
            getMatchingListings(searchTerm) {
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
            }
        },
        mounted() {
            this.getListings();
        },
        created() {
            eventBus.$on('newSearch', (searchTerm) => this.getMatchingListings(searchTerm));

            eventBus.$on('nextPage', () => this.nextPage());

            eventBus.$on('prevPage', () => this.prevPage());
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

    .bottomSearch {
        margin-top: 30px;
    }

    #buttonBar {
        background-color: dimgray;
        display: inline-block;
        float: top;
    }

    .pageButtons {
        margin: 10px 10px;
    }

    #navSide {
        background-color: dimgray;
        display: inline-block;
        float: right;
    }

    button {
        text-decoration: none;
        text-align: center;
        padding: 10px 20px;
        border: none;
        color: black;
        background-color: dimgray;
    }
    #mainSection {
        background-color: dimgray;
        float: top;
        width: 100%;
    }

    #mainList {
        background-color: lightgray;
        width: 70%;
        display: inline-block;
        float: left;
    }

    body, html {
        margin: 0;
        padding: 0;
        background-color: dimgray;
    }
</style>