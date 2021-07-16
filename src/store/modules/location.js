// initial state
const state = () => ({
  items: [
    { id: 1, name: 'Zagreb', postalCode: 10000, lat: 45.815399, lng: 15.966568 },
    { id: 2, name: 'Rijeka', postalCode: 51000, lat: 45.328979, lng: 14.457664 },
    { id: 3, name: 'Zadar', postalCode: 23000, lat: 44.11972, lng: 15.24222 },
    { id: 4, name: 'Split', postalCode: 21000, lat: 43.508133, lng: 16.440193 },
    { id: 5, name: 'Pula', postalCode: 52100, lat: 44.86833, lng: 13.84806 },
  ]
})

// getters
const getters = {
  locations: (state, getters, rootState) => state.items,
  getItemById: (state) => (id) => state.items.find(loc => loc.id === id),
}

// actions
const actions = {
  getLocations ({ commit }) {
    // shop.getProducts(locations => {
    //   commit('setLocations', locations)
    // })
  }
}

// mutations
const mutations = {
  setLocations (state, locations) {
    state.items = locations
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}