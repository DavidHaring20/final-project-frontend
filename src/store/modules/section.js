// initial state
const state = () => ({
  defaultPermissions: [ 'view', 'edit', 'hidden' ],
  items: [
    { id: 1, name: 'Users', roleKey: 'user' },
    { id: 2, name: 'Devices', roleKey: 'device' },
    { id: 3, name: 'Stories', roleKey: 'story' },
    { id: 4, name: 'Analytics', roleKey: 'analytics' },
    { id: 5, name: 'Settings', roleKey: 'settings' },
    { id: 6, name: 'Resources & Clip Editor', roleKey: 'resources' },
  ]
})

// getters
const getters = {
  sections: (state, getters, rootState) => state.items,
  getDefaultPermissions: (state, getters, rootState) => state.defaultPermissions,
  getItemById: (state, getters, rootState) => (id) => state.items.find(section => section.id === id),
  getItemByName: (state, getters, rootState) => (name) => state.items.find(section => section.name === name)
}

// actions
const actions = {
  getSections ({ commit }) {

  }
}

// mutations
const mutations = {
  setLocations (state, sections) {
    state.items = sections
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}