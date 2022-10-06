import { createStore } from 'vuex'

export default createStore({
  state: {
    componentList: null || JSON.parse(localStorage.getItem('componentList')!),
    currentComponent: null || JSON.parse(localStorage.getItem('currentComponent')!),
    activeIndex: null || Number(localStorage.getItem('activeIndex'))
  },
  mutations: {
    setComponentList(state, data) {
      state.componentList = data
    },
    setCurrentComponent(state, data) {
      state.currentComponent = data
    },
    setActiveIndex(state, data) {
      state.activeIndex = data
    }
  },
  actions: {},
  modules: {}
})
