// initial state
const state = () => ({
  items: [
    { id: 1, model: 'device', action: 'error', title: 'Device stopped working', description: '', created_at: '2021-01-07 11:00:00' },
    { id: 2, model: 'device', action: 'warning', title: 'Device reported a bad wifi connection', description: '', created_at: '2021-01-05 12:45:00' },
    { id: 3, model: 'story', action: 'create', title: 'Created a new story', description: '', created_at: '2021-01-03 23:30:00' },
    { id: 4, model: 'story', action: 'create', title: 'Created a new story', description: '', created_at: '2021-01-03 16:20:00' },
    { id: 5, model: 'resource', action: 'create', title: 'Uploaded a new media resource', description: '', created_at: '2021-01-03 01:00:00' },
    { id: 6, model: 'device', action: 'create', title: 'Added a new device', description: '', created_at: '2021-01-01 07:31:00' },
  ]
})

// getters
const getters = {
  activities: (state, getters, rootState) => state.items,
  getItemById: (state) => (id) => state.items.find(item => item.id === id)
}

// actions
const actions = {
  getActivity ({ commit }) {
    // shop.getProducts(activities => {
    //   commit('setActivitys', activities)
    // })
  }
}

// mutations
const mutations = {
  setActivity (state, activities) {
    state.items = activities
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}