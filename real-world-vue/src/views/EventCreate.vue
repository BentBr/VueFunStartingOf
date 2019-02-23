<template>
    <div>
        <h1>Create Event, {{ user.name }}</h1>
        <p>There are {{ catLength }} categories</p>
        <p>{{ getEventById(2) }}</p>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: "EventCreate.vue",
        computed: {
            catLength() {
                return this.$store.getters.catLength
        },
            ...mapGetters(['getEventById']),
            ...mapState (['user', 'categories'])
        },
        getEvent() {
            return this.$store.getters.getEventById
        }
    }
</script>

<style scoped>

</style>