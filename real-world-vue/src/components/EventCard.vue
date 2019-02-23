<template>
    <router-link class="event-link" :to="{ name: 'event-show', params: { id: '1' } }">
        <div class="event-card -shadow">
            <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
            <h4 class="title">{{ event.title }}</h4>
            <BaseIcon name="users" />
            <span>{{ event.attendees.length }} attending</span>
        </div>
    </router-link>
</template>

<script>
    import BaseIcon from "./BaseIcon";
    export default {
        name: "EventCard",
        components: {BaseIcon},
        data() {
            return {
                event: {
                    id: 1,
                    title: 'Park Cleanup',
                    date: 'Tues Aug 19, 2019',
                    Time: '6:00',
                    attendees:[
                        { id: 'abc123', name: 'Adam Huhu' },
                        { id: 'cde456', name: 'Peter Pan' }
                    ]
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .event-card {
        padding: 20px;
        margin-bottom: 24px;
        transition: all 0.2s linear;
        cursor: pointer;
    }
    .event-card:hover {
        transform: scale(1.01);
        box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
    }
    .event-card > .title {
        margin: 0;
    }

    .event-link {
        color: black;
        text-decoration: none;
        font-weight: 100;
    }
</style>