<template>
    <div id="buttonBar" data-spy="affix" data-offset-top="200px">
        <b-nav-form @submit.prevent="onSubmit">
            <b-form-input v-model="searchTerm" size="sm" class="mr-sm-1 bottomSearch" type="text" placeholder="Find Watches"/>
            <b-button v-on:click="newSearch" size="sm" class="bottomSearch" type="submit" variant="dark">Search</b-button>
        </b-nav-form>
        <b-button class="pageButtons" size="lg" variant="dark" v-on:click="prevPage">Prev</b-button>
        <b-nav-text variant="dark" id="pageNumberText">{{pageNumber}}</b-nav-text>
        <b-button class="pageButtons" size="lg" variant="dark" v-on:click="nextPage">Next</b-button>
    </div>
</template>

<script>
    import BNavText from "bootstrap-vue/src/components/nav/nav-text";
    import BButton from "bootstrap-vue/src/components/button/button";
    import BFormInput from "bootstrap-vue/src/components/form-input/form-input";
    import BNavForm from "bootstrap-vue/src/components/nav/nav-form";

    import { eventBus } from "../main"

    export default {
        name: "Navigation",
        components: {
            BNavForm,
            BFormInput,
            BNavText,
            BButton
        },
        props: {
            pageNumber: Number
        },
        data() {
            return {
                searchTerm: ""
            }
        },
        methods: {
            newSearch: function () {
                eventBus.$emit('newSearch', this.searchTerm)
            },
            nextPage: function () {
                eventBus.$emit('nextPage')
            },
            prevPage: function () {
                eventBus.$emit('prevPage')
            },
            onSubmit: function () {
                
            }
        }
    }
</script>

<style scoped>
    #buttonBar {
        background-color: dimgray;
        display: inline-block;
        float: top;
    }

    .bottomSearch {
        margin-top: 15px;
    }

    .pageButtons {
        margin: 0px 10px;
    }

    #pageNumberText {
        font-size: 20px;
        color: darkblue;
    }

    button {
        text-decoration: none;
        text-align: center;
        padding: 10px 20px;
        border: none;
        color: black;
        background-color: dimgray;
    }
</style>