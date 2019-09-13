import api from '@/api'
import {
  FETCH_POST_LIST,
  FETCH_POST,
  SET_ACCESS_TOKEN,
  SET_MY_INFO,
  DESTROY_ACCESS_TOKEN,
  DESTROY_MY_INFO,
  UPDATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from './mutations-types'

export default {
  async fetchPostList ({ commit }) {
    const res = await api.get('/posts')
    commit(FETCH_POST_LIST, res.data)
  },
  async fetchPost ({ commit }, postId) {
    const res = await api.get(`/posts/${postId}`)
    commit(FETCH_POST, res.data)
  },
  async signin ({ commit }, payload) {
    const { email, password } = payload
    const res = await api.post(`/auth/signin`, { email, password })
    const { accessToken } = res.data
    commit(SET_ACCESS_TOKEN, accessToken)
    const me = await api.get('/users/me')
    commit(SET_MY_INFO, me.data)
  },
  async signinByToken ({ commit }, token) {
    commit(SET_ACCESS_TOKEN, token)
    const res = await api.get('/users/me')
    commit(SET_MY_INFO, res.data)
  },
  signout ({ commit }) {
    commit(DESTROY_ACCESS_TOKEN)
    commit(DESTROY_MY_INFO)
  },
  createComment ({ commit, state }, comment) {
    const postId = state.post.id
    return api.post(`/posts/${postId}/comments`, { contents: comment }).then(res => {
      commit(UPDATE_COMMENT, res.data)
    })
  },
  editComment ({ commit, state }, { commentId, comment }) {
    const postId = state.post.id
    return api.put(`/posts/${postId}/comments/${commentId}`, { contents: comment }).then(res => {
      commit(EDIT_COMMENT, res.data)
    })
  },
  deleteComment ({ commit, state }, commentId) {
    const postId = state.post.id
    return api.delete(`/posts/${postId}/comments/${commentId}`).then(res => {
      commit(DELETE_COMMENT, commentId)
    })
  }
}
