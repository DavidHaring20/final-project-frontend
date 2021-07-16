const FORMABLE = ['name', 'ratio', 'from', 'to', 'suspended'];

// initial state
const state = () => ({
  items: [
    { id: 1, name: 'Story #1', ratio: '16/9', length: '30:00', suspended: false, clips: [1, 2], devices: [1, 2, 3, 4, 5], from: '2021-01-01 00:00:00', to: '2021-01-02 00:00:00', created_at: '2021-01-01 00:00:00', updated_at: '2021-01-02 00:00:00' },
    { id: 2, name: 'Story #2', ratio: '16/9', length: '30:00', suspended: false, clips: [1, 2], devices: [1, 3], from: '2021-01-01 00:00:00', to: '2021-01-02 00:00:00', created_at: '2021-01-01 00:00:00', updated_at: '2021-01-02 00:00:00' },
    { id: 3, name: 'Story #3', ratio: '16/9', length: '30:00', suspended: false, clips: [2, 3], devices: [2, 5], from: '2021-01-01 00:00:00', to: '2021-01-02 00:00:00', created_at: '2021-01-01 00:00:00', updated_at: '2021-01-02 00:00:00' },
    { id: 4, name: 'Story #4', ratio: '16/9', length: '30:00', suspended: false, clips: [1, 3], devices: [3], from: '2021-01-01 00:00:00', to: '2021-01-02 00:00:00', created_at: '2021-01-01 00:00:00', updated_at: '2021-01-02 00:00:00' },
    { id: 5, name: 'Story #5', ratio: '16/9', length: '30:00', suspended: false, clips: [2, 4], devices: [2, 4], from: '2021-01-01 00:00:00', to: '2021-01-02 00:00:00', created_at: '2021-01-01 00:00:00', updated_at: '2021-01-02 00:00:00' },
  ]
})

// getters
const getters = {
  stories: (state, getters, rootState, rootGetters) => state.items,
  getItemById: (state, getters, rootState, rootGetters) => (id) => state.items.find(item => item.id === id),
  mapToForm: (state, getters, rootState, rootGetters) => (item) => {
    return Object.keys(item).reduce((object, key) => {
      if (FORMABLE.includes(key)) {
        if(typeof item[key] === 'object') object[key] = JSON.parse(JSON.stringify(item[key]))
        else object[key] = item[key]
      }
      return object
    }, {});
  },
  getClipStories: (state, getters, rootState, rootGetters) => (clipId) => state.items.filter(item => item.clips.includes(clipId)),
  getDeviceStories: (state, getters, rootState, rootGetters) => (deviceId) => state.items.filter(item => item.devices.includes(deviceId)),
}

// actions
const actions = {

}

// mutations
const mutations = {
  setResource (state, stories) {
    state.items = stories
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}