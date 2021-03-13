import Vue from 'vue'
import { Notify } from 'quasar'

export const handleErrors = async (error, { router, store, axios }) => {
  if (!window.navigator?.onLine) {
    return Notify.create({
      type: 'warning',
      message: 'Sem conexão com a internet.'
    })
  }

  if (!error.response || typeof error.response !== 'object') {
    return Notify.create({
      type: 'warning',
      message: 'Problemas de conexão, por favor tente mais tarde.'
    })
  }

  const { status, data } = error.response

  const handleError = {
    401: async () => {
      await store.dispatch('auth/logout')

      const errors = data.errors && Object.values(data.errors).flat()

      Vue.prototype.$q.notify({
        type: 'warning',
        message: errors.shift()
      })
    },
    403: () => {
      router.replace({ name: 'app.simulators' })
      Vue.prototype.$q.notify({
        type: 'warning',
        message: 'Você não possui permissões suficientes para realizar essa ação.'
      })
    },
    422: () => {
      const errors = Object.values(data.errors).flat()
      Vue.prototype.$q.notify({
        type: 'warning',
        message: errors.shift()
      })
    },
    429: () => {
      Vue.prototype.$q.notify({
        type: 'negative',
        message: 'Você está realizando muitas ações em um curto período de tempo, por favor tente novamente mais tarde.'
      })
    },
    500: () => {
      Vue.prototype.$q.notify({
        type: 'negative',
        message: 'Não foi possível realizar esta ação no momento. tente novamente mais tarde.'
      })
    }
  }

  return (handleError[status] && await handleError[status]()) || Promise.reject(error)
}
