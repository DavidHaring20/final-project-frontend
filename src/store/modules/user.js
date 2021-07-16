// initial state
const state = () => ({
  items: [
    { id: 1, name: 'Test User', email: 'test@example.com', avatar: 'https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg', suspended: false, roles: ['user_edit', 'device_edit', 'resource_edit'], location_permissions: [], created_at: '2021-01-01 13:00:00', last_activity: '2021-01-04 01:00:00' },
    { id: 2, name: 'Super User', email: 'super@example.com', avatar: null, suspended: false, roles: ['user_view', 'device_hidden', 'resource_hidden'], location_permissions: [], created_at: '2021-02-02 02:00:00', last_activity: '2021-02-04 02:00:00' },
    { id: 3, name: 'Example User', email: 'user@example.com', avatar: null, suspended: true, roles: ['user_view', 'device_hidden', 'resource_hidden'], location_permissions: [], created_at: '2021-03-03 03:00:00', last_activity: '2021-03-04 03:00:00' },
    { id: 4, name: 'Random User', email: 'random@example.com', avatar: null, suspended: true, roles: ['user_view', 'device_hidden', 'resource_hidden'], location_permissions: [], created_at: '2021-04-04 04:00:00', last_activity: '2021-04-04 04:00:00' },
    { id: 5, name: 'Development User', email: 'dev@example.com', avatar: null, suspended: true, roles: ['user_view', 'device_hidden', 'resource_hidden'], location_permissions: [], created_at: '2021-05-05 05:00:00', last_activity: '2021-05-04 05:00:00' },
  ]
})

// getters
const getters = {
  users: (state, getters, rootState) => state.items,
  getItemById: (state) => (id) => state.items.find(user => user.id === id)
}

// actions
const actions = {
  getUsers ({ commit }) {
    // shop.getProducts(users => {
    //   commit('setUsers', users)
    // })
  }
}

// mutations
const mutations = {
  setUsers (state, users) {
    state.items = users
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}