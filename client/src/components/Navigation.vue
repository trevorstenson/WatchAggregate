<template>
    <div id="buttonBar">
        <b-form-select v-model="sortMethod" :options="options" v-on:change="newSearch" size="lg" class="mt-3"/>
        <b-nav-form @submit.prevent="onSubmit" class="mt-3 bottomSearch">
            <b-form-input v-model="searchTerm" size="lg" class="mr-sm-1" type="text" placeholder="Find Watches"/>
            <b-button v-on:click="newSearch" size="lg" type="submit" variant="dark">Search</b-button>
        </b-nav-form>
        <b-button class="pageButtons" size="lg" variant="dark" v-on:click="prevPage">Prev</b-button>
        <b-nav-text variant="dark" id="pageNumberText" class="mt-3">{{pageNumber}}</b-nav-text>
        <b-button class="pageButtons" size="lg" variant="dark" v-on:click="nextPage">Next</b-button>
    </div>
</template>

<script>
    import BNavText from "bootstrap-vue/src/components/nav/nav-text";
    import BButton from "bootstrap-vue/src/components/button/button";
    import BFormInput from "bootstrap-vue/src/components/form-input/form-input";
    import BNavForm from "bootstrap-vue/src/components/nav/nav-form";

    import { eventBus } from "../main"
    import BFormSelect from "bootstrap-vue/src/components/form-select/form-select";

    export default {
        name: "Navigation",
        components: {
            BFormSelect,
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
                searchTerm: "",
                sortMethod: 1,
                options: [
                    { value: 1, text: 'Sort By Newest' },
                    { value: 2, text: 'Sort By Price (Low to High)' }
                ]
            }
        },
        methods: {
            newSearch: function () {
                eventBus.$emit('newSearch', this.searchTerm, this.sortMethod)
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
        margin-top: 5px;
    }

    .pageButtons {
        margin: 0px 10px;
    }

    #pageNumberText {
        font-size: 30px;
        color: darkblue;
    }

    button {
        text-decoration: none;
        text-align: center;
        padding: 10px 20px;
        border: none;
        color: white;
        background-color: dimgray;
    }

    .sortMethod button {
        margin-top: 10px;
        background-color: darkgray;
        color: black;
    }
</style>