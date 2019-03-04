<template>
    <div id="navbar">
        <b-navbar toggleable="sm" type="dark" variant="secondary" size="lg">
            <b-navbar-brand href="." id="bigTitle">Watch Aggregator</b-navbar-brand>
            <b-nav-text class="large centerText">Browse online used watch listings from multiple sources efficiently</b-nav-text>
            <b-navbar-toggle target="nav_collapse"/>
                <b-navbar-nav class="ml-auto">
                    <b-button size="lg" class="my-2 my-sm-0">About</b-button>
                </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
    import BNavbar from "bootstrap-vue/src/components/navbar/navbar";
    import BNavbarBrand from "bootstrap-vue/src/components/navbar/navbar-brand";
    import BNavText from "bootstrap-vue/src/components/nav/nav-text";
    import BNavbarToggle from "bootstrap-vue/src/components/navbar/navbar-toggle";
    import BNavbarNav from "bootstrap-vue/src/components/navbar/navbar-nav";
    import BButton from "bootstrap-vue/src/components/button/button";

    export default {
        name: "TopBar",
        components: {BButton, BNavbarNav, BNavbarToggle, BNavText, BNavbarBrand, BNavbar},
        data() {
            return {
                searchTerm: ""
            }
        }
    }
</script>

<style scoped>

</style>