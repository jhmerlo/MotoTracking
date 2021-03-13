import Vue from 'vue'
export function setUser (state, payload) {
  Vue.set(state, 'user', payload)
}
