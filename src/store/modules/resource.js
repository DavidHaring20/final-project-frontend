const FORMABLE = ['name'];

// initial state
const state = () => ({
  items: [
    { id: 1, name: 'sky-1600x900.jpg', type: 'image', link: '/images/content/sky-1600x900.jpg', created_at: '2021-01-01 00:00:00' },
    { id: 2, name: 'stars-1600x900.jpg', type: 'image', link: '/images/content/stars-1600x900.jpg', created_at: '2021-01-01 00:00:00' },
    { id: 3, name: 'purple-border-1600x900.jpg', type: 'image', link: '/images/content/purple-border-1600x900.jpg', created_at: '2021-01-01 00:00:00' },
    { id: 4, name: 'phone-social-1280x853.jpg', type: 'image', link: '/images/content/phone-social-1280x853.jpg', created_at: '2021-01-01 00:00:00' },
    { id: 5, name: 'entrepreneur-1280x905.jpg', type: 'image', link: '/images/content/entrepreneur-1280x905.jpg', created_at: '2021-01-01 00:00:00' },
    { id: 6, name: 'meeting-1280x807.jpg', type: 'image', link: '/images/content/meeting-1280x807.jpg', created_at: '2021-01-01 00:00:00' },
    { id: 7, name: 'logo-tpl.png', type: 'image', link: '/images/content/logo-tpl.png', created_at: '2021-01-01 00:00:00' },
    { id: 8, name: 'seo-1280x850.jpg', type: 'image', link: '/images/content/seo-1280x850.jpg', created_at: '2021-01-01 00:00:00' },
    { id: 9, name: 'social-1280x720.jpg', type: 'image', link: '/images/content/social-1280x720.jpg', created_at: '2021-01-01 00:00:00' },
    { id: 10, name: 'success-1280x720.jpg', type: 'image', link: '/images/content/success-1280x720.jpg', created_at: '2021-01-01 00:00:00' },
    { id: 11, name: 'glaciar.mp4', type: 'video', length: 16, width: 1248, height: 704, link: '/videos/glaciar.mp4', created_at: '2021-01-01 00:00:00' },
    { id: 12, name: 'sky.mp4', type: 'video', length: 8, width: 1280, height: 720, link: '/videos/sky.mp4', created_at: '2021-01-01 00:00:00' },
    { id: 13, name: 'storm.mp4', type: 'video', length: 10, width: 1620, height: 1080, link: '/videos/storm.mp4', created_at: '2021-01-01 00:00:00' },
    { id: 14, name: 'mountain-clouds.mp4', type: 'video', length: 20, width: 1280, height: 720, link: '/videos/sky.mp4', created_at: '2021-01-01 00:00:00' },
    { id: 15, name: 'green-popsicle.mp4', type: 'video', length: 9, width: 1280, height: 720, link: '/videos/sky.mp4', created_at: '2021-01-01 00:00:00' },
  ]
})

// getters
const getters = {
  resources: (state, getters, rootState) => state.items,
  getItemById: (state) => (id) => state.items.find(item => item.id === id),
  getItemsByIds: (state) => (ids) => state.items.filter(item => ids.includes(item.id)),
  mapToForm: (state, getters, rootState, rootGetters) => (item) => {
    return Object.keys(item).reduce((object, key) => {
      if (FORMABLE.includes(key)) {
        if(typeof item[key] === 'object') object[key] = JSON.parse(JSON.stringify(item[key]))
        else object[key] = item[key]
      }
      return object
    }, {});
  },
  getUnusedResources: (state, getters, rootState, rootGetters) => {
    const _usedIds = rootGetters['clip/clips']
    .map(clip => clip.resources)
    .reduce((acc, curr) => acc.concat(curr), [])
    .reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], [])
    return state.items.filter(item => !_usedIds.includes(item.id))
  }
}

// actions
const actions = {
  getResource ({ commit }) {

  }
}

// mutations
const mutations = {
  setResource (state, resources) {
    state.items = resources
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}