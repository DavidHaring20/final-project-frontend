// initial state
const FORMABLE = ['name', 'tags', 'picture', 'address', 'suspended', 'camSource', 'location_id', 'coordinates', 'location'];

const state = () => ({
  items: [
    { id: 1, name: 'Device #1', location_id: 1, address: 'Ilica 1', coordinates: { lat: 45.815399, lng: 15.966568 }, suspended: false, playlists_num: 5, health: 33, camSource: 'https://cdn-004.whatsupcams.com/hls/hr_rijeka03.m3u8', tags: [], stories: [], created_at: '2021-01-01 01:00:00', last_activity: '2021-01-04 01:00:00', picture: 'https://mediamodifier.com/blog/wp-content/uploads/2020/02/10-wide-banner-billboard-mockup-generator.jpg' },
    { id: 2, name: 'Device #2', location_id: 2, address: 'Korzo 1', coordinates: { lat: 45.328979, lng: 14.457664 }, suspended: false, playlists_num: 5, health: 73, camSource: 'https://cdn-004.whatsupcams.com/hls/hr_rijeka03.m3u8', tags: [], stories: [], created_at: '2021-02-02 01:00:00', last_activity: '2021-02-04 02:00:00', picture: 'https://mediamodifier.com/blog/wp-content/uploads/2020/02/03-large-billboard-sign-mockup-template.jpg' },
    { id: 3, name: 'Device #3', location_id: 3, address: 'Ul. Akcije Maslenica 1', coordinates: { lat: 44.11972, lng: 15.24222 }, suspended: true, playlists_num: 5, health: 100, camSource: 'https://cdn-004.whatsupcams.com/hls/hr_rijeka03.m3u8', tags: [], stories: [], created_at: '2021-03-03 01:00:00', last_activity: '2021-03-04 03:00:00', picture: 'https://mockupsforfree.com/wp-content/uploads/2019/10/Billboard_Music_MockupsForFree-02-1.png' },
    { id: 4, name: 'Device #4', location_id: 4, address: 'Trg Republike 1', coordinates: { lat: 43.508133, lng: 16.440193 }, suspended: false, playlists_num: 5, health: 23, camSource: 'https://cdn-004.whatsupcams.com/hls/hr_rijeka03.m3u8', tags: [], stories: [], created_at: '2021-04-04 01:00:00', last_activity: '2021-04-04 04:00:00', picture: 'https://img.freepik.com/free-photo/blank-billboard-new-advertisement-isolated-white-background_23-2147901013.jpg' },
    { id: 5, name: 'Device #5', location_id: 5, address: 'Narodni trg 9', coordinates: { lat: 44.86833, lng: 13.84806 }, suspended: true, playlists_num: 5, health: 25, camSource: 'https://cdn-004.whatsupcams.com/hls/hr_rijeka03.m3u8', tags: [], stories: [], created_at: '2021-05-05 01:00:00', last_activity: '2021-05-04 05:00:00', picture: 'https://mediamodifier.com/blog/wp-content/uploads/2020/02/17-subway-movie-billboard-mockup-psd-template.jpg' },
  ]
})

// getters
const getters = {
  devices: (state, getters, rootState, rootGetters) => state.items.map((item, i) => {
    item.location = rootGetters['location/getItemById'](item.location_id)
    return item;
  }),
  getItemById: (state, getters, rootState, rootGetters) => (id) => {
    const _item = state.items.find(device => device.id === id)
    _item.location = rootGetters['location/getItemById'](_item.location_id)
    return _item;
  },
  getItemsByIds: (state, getters, rootState, rootGetters) => (ids) => {
    return state.items.filter(device => ids.includes(device.id))
    .map(_item => {
      _item.location = rootGetters['location/getItemById'](_item.location_id)
      return _item
    })
  },
  mapToForm: (state, getters, rootState, rootGetters) => (device) => {
    return Object.keys(device).reduce((object, key) => {
      if (FORMABLE.includes(key)) {
        if(typeof device[key] === 'object') object[key] = JSON.parse(JSON.stringify(device[key]))
        else object[key] = device[key]
      }
      return object
    }, {});
  },
  countDevicesInLocation: (state, geter, rootState, rootGetters) => (location) => {
    return state.items.filter(item => item.location_id === location.id).length
  },
}

// actions
const actions = {
  getDevices ({ commit }) {

  }
}

// mutations
const mutations = {
  setLocations (state, devices) {
    state.items = devices
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
