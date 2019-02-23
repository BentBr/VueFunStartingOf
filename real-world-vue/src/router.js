import Vue from "vue";
import Router from "vue-router";
import EventCreate from "./views/EventCreate";
import EventList from "./views/EventList";
import EventShow from "./views/EventShow";
import User from "./views/User";
import NotFoundComponent from "./views/NotFoundComponent";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/user/:username',
      name: 'user',
      component: User,
      props: true
    },
    {
      path: '*',
      component: NotFoundComponent
    }
    /*{
      path: '/about-us',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' *//* './views/About.vue'),
      alias: '/about'
    }*/

  ]
});
