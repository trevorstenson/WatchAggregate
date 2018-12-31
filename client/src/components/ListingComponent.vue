<template>
    <div class="listing">
        <h6>{{entry.title}}</h6>
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