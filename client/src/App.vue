<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <ListingComponent v-for="listing in listings" :entry="listing"/>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import ListingComponent from './components/ListingComponent.vue'

    const listings = [
        {
            title: 'hamilton',
            link: 'reddit',
            price: '$230'
        },
        {
            title: 'oris',
            link: 'wus',
            price: '$650'
        }
    ];

    export default {
        name: 'app',
        components: {
            HelloWorld, ListingComponent
        },
        data() {
            return {
                listings
            }
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
