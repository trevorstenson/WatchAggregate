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
        width: 75%;
        overflow: auto;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        border-left: 2px solid gray;
        border-right: 2px solid gray;
        padding-bottom: 2px;
        padding-top: 2px;
        font-size: 12px;
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
        color: darkblue;
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