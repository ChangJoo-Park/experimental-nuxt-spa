import Cookies from 'js-cookie'
import axios from 'axios'

export const state = () => ({
  items: [],
  user: null
})

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_ITEMS(state, payload) {
    state.items = payload
  }
}

export const actions = {
  async nuxtClientInit(context) {
    const key = Cookies.get('authorization')
    if (key) {
      try {
        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: key
          }
        })
        if (response.data) {
          context.commit('SET_USER', response.data)
          return Promise.resolve()
        } else {
          Cookies.remove('authorization')
          context.commit('SET_USER', null)
          return Promise.resolve()
        }
      } catch (error) {
        Cookies.remove('authorization')
        context.commit('SET_USER', null)
        return Promise.resolve()
      }
    }
  },
  setUser({ commit }, payload) {
    Cookies.set('authorization', payload.access_token)
    commit('SET_USER', payload.user)
  },
  logout({ commit }) {
    Cookies.remove('authorization')
    commit('SET_USER', null)
  },
  setItems({ commit }, payload) {
    commit('SET_ITEMS', payload)
  }
}

export const getters = {
  user: state => state.user,
  items: state => state.items
}
