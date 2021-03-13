import axios from 'axios'

import { handleErrors } from 'src/utils/api'

export default ({ Vue, router, store }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: process.env.API_URL,
    timeout: 180000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'Application/json'
    }
  })
  Vue.prototype.$axios.interceptors.request.use(request => {
    const token = localStorage.getItem('access_token')
    if (token) request.headers.Authorization = `Bearer ${token}`
    if (!request.disableLoading) Vue.prototype.$q.loading.show()

    return request
  }, error => {
    Vue.prototype.$q.loading.hide()

    return Promise.reject(error)
  })

  Vue.prototype.$axios.interceptors.response.use(response => {
    Vue.prototype.$q.loading.hide()

    return response
  }, error => {
    Vue.prototype.$q.loading.hide()

    if (!error.config.ignoreErrorHandling) {
      return handleErrors(error, { router, store, axios })
    }

    return Promise.reject(error)
  })
}
