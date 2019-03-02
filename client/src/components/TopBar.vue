<template>
    <div id="navbar">
        <b-navbar toggleable="sm" type="dark" variant="secondary">
            <b-navbar-brand href="#" id="bigTitle">Watch Aggregator</b-navbar-brand>
            <b-nav-text class="small centerText">Browse online used watch listings from multiple sources efficiently</b-nav-text>
            <b-navbar-toggle target="nav_collapse"/>
                <b-navbar-nav class="ml-auto">
                    <b-nav-form @submit.prevent="onSubmit">
                        <b-form-input v-model="searchTerm" size="sm" class="mr-sm-1" type="text" placeholder="Find Watches" />

                        <b-button v-on:click="newSearch" size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>
                    <b-button size="sm" class="my-2 my-sm-0">About</b-button>
                </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
    import BNavbar from "bootstrap-vue/src/components/navbar/navbar";
    import BNavbarBrand from "bootstrap-vue/src/components/navbar/navbar-brand";
    import BNavItem from "bootstrap-vue/src/components/nav/nav-item";
    import BNavText from "bootstrap-vue/src/components/nav/nav-text";

    import { eventBus } from "../main"

    export default {
        name: "TopBar",
        components: {BNavText, BNavItem, BNavbarBrand, BNavbar},
        data() {
            return {
                searchTerm: ""
            }
        },
        methods: {
            newSearch: function () {
                eventBus.$emit('newSearch', this.searchTerm);
            },
            onSubmit: function () {

            }
        }
    }
</script>

<style scoped>

</style>