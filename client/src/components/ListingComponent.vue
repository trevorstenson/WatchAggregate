<template>
    <div class="listing">
        <h4><a :href="entry.link">{{entry.title}}</a></h4>
        <span class="price"><b>Price: {{entry.price}}</b></span>
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

</style>