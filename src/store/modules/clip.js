const FORMABLE = ['name', 'ratio', 'width', 'height', 'resources', 'playlists'];

// initial state
const state = () => ({
  items: [
    { id: 1, name: 'Clip #1', length: '30:00', width: 1600, height: 900, resources: [1, 7], playlists: [1, 2], created_at: '2021-01-01 00:00:00', updated_at: '2021-01-02 00:00:00' },
    { id: 2, name: 'Clip #2', length: '30:00', width: 1600, height: 900, resources: [2, 7], playlists: [1], created_at: '2021-01-01 00:00:00', updated_at: '2021-01-02 00:00:00' },
    { id: 3, name: 'Clip #3', length: '30:00', width: 1600, height: 900, resources: [3, 7], playlists: [3], created_at: '2021-01-01 00:00:00', updated_at: '2021-01-02 00:00:00' },
    { id: 4, name: 'Clip #4', length: '30:00', width: 1600, height: 900, resources: [5, 7], playlists: [5], created_at: '2021-01-01 00:00:00', updated_at: '2021-01-02 00:00:00' },
    { id: 5, name: 'Clip #5', length: '30:00', width: 1600, height: 900, resources: [6, 7], playlists: [2], created_at: '2021-01-01 00:00:00', updated_at: '2021-01-02 00:00:00' },
  ]
})

// getters
const getters = {
  clips: (state, getters, rootState, rootGetters) => state.items,
  getItemById: (state, getters, rootState, rootGetters) => (id) => state.items.find(item => item.id === id),
  getItemsByIds: (state, getters, rootState, rootGetters) => (ids) => state.items.filter(device => ids.includes(device.id)),
  mapToForm: (state, getters, rootState, rootGetters) => (item) => {
    return Object.keys(item).reduce((object, key) => {
      if (FORMABLE.includes(key)) {
        if(typeof item[key] === 'object') object[key] = JSON.parse(JSON.stringify(item[key]))
        else object[key] = item[key]
      }
      return object
    }, {});
  },
}

// actions
const actions = {

}

// mutations
const mutations = {
  setResource (state, clips) {
    state.items = clips
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
