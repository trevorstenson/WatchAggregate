<template>
    <div class="buttonBar">
        <button v-on:click="$emit('prev')">Previous Page</button>
        <button v-on:click="$emit('next')">Next Page</button>
    </div>
</template>

<script>
    export default {
        name: "ButtonBar",
        props: {
            currentPage: Number
        }
    }
</script>

<style scoped>

</style>