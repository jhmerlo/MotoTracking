import { Notify } from 'quasar'

Notify.setDefaults({
  progress: true,
  color: 'primary',
  badgeClass: 'text-subtitle1',
  actions: [
    {
      icon: 'close',
      round: true,
      flat: true,
      multiLine: true,
      size: 'sm',
      color: 'red-8',
      attrs: {
        'aria-label': 'Dismiss'
      }
    }
  ]
})
