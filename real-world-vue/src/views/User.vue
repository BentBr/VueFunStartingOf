<template>
    <div>
        <h1>User page of {{ username }}</h1>
    </div>
</template>

<script>
    export default {
        props: ['username'],
        name: "User.vue"
    }
</script>

<style scoped>

</style>