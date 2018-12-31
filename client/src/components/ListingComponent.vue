<template>
    <div class="listing">
        <div class="title"><a :href="entry.link">{{entry.title}}</a></div>
        <div class="price"><b>{{entry.price}}</b></div>
    </div>
</template>

<script>
    export default {
        name: 'ListingComponent',
        props: {
            entry: Object
        }
    }
</script>

<style scoped>
    .listing {
        background-color: lightslategray;
        width: 75%;
        overflow: auto;
        border-bottom: 2px solid aliceblue;
        padding-bottom: 2px;
        padding-top: 2px;
        font-size: 21px;
    }

    .title {
        display: inline;
        margin-left: 5px;
        float: left;
    }

    .price {
        display: inline;
        float: right;
        margin-right: 15px;
        color: greenyellow;
    }

    a:link {
        font-weight: bold;
        text-decoration: none;
        color: darkslateblue;
    }

    a:visited {
        font-weight: lighter;
        text-decoration: none;
    }
</style>