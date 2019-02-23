import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {id: '123abc', name: 'Bent' },
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events: [
      {id: 1, title: '...', organizer: '...' },
      {id: 2, title: '...', organizer: '...' },
      {id: 3, title: '...', organizer: '...' },
      {id: 4, title: '...', organizer: '...' }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    catLength: state => {
      return state.categories.length
    },
    getEventById: (state) => (id) => {
      return state.events.find(event => event.id === id)
    }
  }
});
