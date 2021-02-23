import { Notify, scroll, exportFile } from 'quasar'
import Url from 'url-parse'
import Vue from 'vue'

const { getScrollTarget, setScrollPosition } = scroll

export const downloadFile = async (url, fileName) => {
  const { data, headers } = await Vue.prototype.$axios.get(url, {
    responseType: 'blob'
  })

  if (headers['content-disposition']) {
    const fileNameMatch = headers['content-disposition'].match(/filename=(.+)/)
    if (fileNameMatch && fileNameMatch.length === 2) {
      fileName = fileNameMatch[1]
    }
  }

  if (!exportFile(fileName, data, headers['content-type'])) {
    this.$q.notify({
      type: 'negative',
      message: 'Não foi possível baixar o arquivo'
    })
  }
}

export const getDateDiff = (date1, date2 = new Date()) => {
  if (typeof date1 === 'string') date1 = new Date(date1)
  if (typeof date2 === 'string') date2 = new Date(date2)

  const diffTime = Math.floor(date2 - date1)
  // 1000 * 60 * 60 * 24 = 86400000
  const diffDays = Math.floor(diffTime / 86400000)

  return [diffDays, diffTime]
}

export const objectAssignNotNullRecursive = (obj = {}) => {
  const newObj = {}

  for (let [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      value = objectAssignNotNullRecursive(value)
    }
    (value !== null && value !== undefined) && Object.assign(newObj, { [key]: value })
  }

  return newObj
}

export const getNestedPropertyRecursive = (obj, key) => {
  if (!obj || !(obj instanceof Object) || Array.isArray(obj)) return
  if (!key || typeof key !== 'string') return
  const keys = key.split('.')
  if (keys.length === 1) {
    return obj[key]
  } else {
    const [nextKey] = keys.splice(0, 1)
    if (obj[nextKey] instanceof Object && !Array.isArray(obj[nextKey])) {
      return getNestedPropertyRecursive(obj[nextKey], keys.join('.'))
    }
  }
}

export const getObjectProperties = (obj, ...keys) => {
  if (!obj || !(obj instanceof Object) || Array.isArray(obj)) throw new Error('Invalid object')
  const newObj = {}

  for (const key of keys) {
    if (Array.isArray(key)) {
      if (Object.prototype.hasOwnProperty.call(obj, key[0])) {
        newObj[key[1]] = obj[key[0]]
      }
    } else {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = obj[key]
      }
    }
  }

  return newObj
}

export const scrollToElement = (el, duration = 500) => {
  const target = getScrollTarget(el)
  const offset = el.offsetTop
  setScrollPosition(target, offset, duration)
}

export const sendNotification = (item, { router, store }) => {
  const { current } = router.history

  if (item.temporary) return

  if (item.type?.indexOf('notify') >= 0) {
    if (item.type !== 'notify-message' || !current.matched.some(route => route.meta.chat)) {
      const actions = item.route ? [
        {
          label: 'Visualizar',
          color: 'secondary',
          handler: () => {
            router.push(item.route)
          }
        }
      ] : undefined

      Notify.create({
        message: item.message,
        actions
      })
    }
  } else {
    if (current.matched.some(route => route.meta.chat)) {
      store.commit('chat/setBatchLatestMessage', [item.batch_id, item])

      if (parseInt(current.params.id) !== item.batch_id) store.commit('chat/increaseUserUnreadMessages', item.batch_id)
    }
  }
}

export const objectToFormData = (obj) => {
  const getPrefix = (prefix, key) => prefix + (prefix ? '[' : '') + key + (prefix ? ']' : '')

  const formData = new FormData()

  const appendValue = (prefix, value) => {
    if (typeof value === 'undefined') return
    else if (typeof value === 'boolean') value = value ? '1' : '0'
    else if (value === null) value = ''

    formData.append(prefix, value)
  }

  const fromArray = (_arr, prefix) => {
    for (let i = 0; i < _arr.length; i++) {
      if (Array.isArray(_arr[i])) {
        fromArray(_arr[i], getPrefix(prefix, i))
      } else if (_arr[i] instanceof Object && !(_arr[i] instanceof Blob)) {
        fromObject(_arr[i], getPrefix(prefix, i))
      } else {
        appendValue(getPrefix(prefix, _arr[i]), _arr[i])
        // typeof value !== 'undefined' && formData.append(getPrefix(prefix, _arr[i]), _arr[i])
      }
    }
  }

  const fromObject = (_obj, prefix = '') => {
    for (const [key, value] of Object.entries(_obj)) {
      if (Array.isArray(value)) {
        fromArray(value, getPrefix(prefix, key))
      } else if (value instanceof Object && !(value instanceof Blob)) {
        fromObject(value, getPrefix(prefix, key))
      } else {
        appendValue(getPrefix(prefix, key), value)
        // typeof value !== 'undefined' && formData.append(getPrefix(prefix, key), value)
      }
    }
  }

  fromObject(obj)

  return formData
}

export const getFileExtension = (fileName) => {
  return fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2)
}

export default {
  computed: {
    isDevEnv () {
      return process.env.DEV
    }
  },
  methods: {
    objectAssignNotNullRecursive,
    getNestedPropertyRecursive,
    getObjectProperties,
    objectAssignAll (obj, value = '') {
      for (const key of Object.keys(obj)) {
        obj[key] = value
      }
    },
    objectAssignProperties (target, source) {
      for (const key of Object.keys(source)) {
        Object.prototype.hasOwnProperty.call(target, (key)) && source[key] && (target[key] = source[key])
      }
    },
    getFileExtension,
    redirectNotification (notificationUrl) {
      const appUrl = process.env.APP_URL
      if (typeof appUrl === 'string' && appUrl.replace(/\/$/, '') === window.location.origin) this.$router.push(new Url(notificationUrl).pathname)
      else window.open(notificationUrl, '_blank')
    },
    downloadFile (url, fileName) {
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    base64toBlob (data, contentType = '') {
      return fetch(data).then(res => res.blob({ type: contentType }))
    },
    blobToFile (blob, fileName) {
      return new File([blob], fileName, {
        type: blob.type,
        lastModified: new Date().getTime()
      })
    },
    monthsToYears (parcels) {
      const val = Math.ceil(parcels / 12 - 1)
      return parcels ? (val < 0 ? 0 : val) : null
    },
    objectToFormData
  }
}
