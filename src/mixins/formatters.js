import { date } from 'quasar'

export const formatMask = (value, pattern) => {
  const v = value.toString()

  let i = 0
  return pattern.replace(/#/g, _ => v[i++])
}

import * as masks from './masks'

export default {
  methods: {
    formatDate (value) {
      if (typeof value !== 'string') return ''

      const result = value.split('-').reverse().join('/')

      return result
    },
    formatDateIncludingHour (timestamp, format = 'DD/MM/YY [às] HH:mm') {
      return date.formatDate(timestamp, format)
    },
    formatDateReverse (value) {
      if (typeof value !== 'string') return ''

      const result = value.split('/').reverse().join('-')

      return result
    },
    formatOnlyDigits (value) {
      if (typeof value !== 'string') return ''

      return value.replace(/\D/gi, '')
    },
    formatOnlyCharacters (value) {
      if (typeof value !== 'string') return ''

      return value.replace(/\d/gi, '')
    },
    formatMoneyReverse (value) {
      value = ('' + value).replace(/\./g, '')

      const match = value.match(/^(\D*)(\d+),(\d+)(\D*)$/)

      if (match) {
        return parseFloat(match[2] + '.' + match[3])
      }

      return null
    },
    formatCode (code, n = 4) {
      if (typeof code !== 'string') return ''

      return String(code).padStart(n, '0')
    },
    formatCPF (value) {
      if (typeof value !== 'string') return ''

      const match = value.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/)

      return match
        ? formatMask(value, masks.cpfMask)
        : value
    },
    formatCNPJ (value) {
      if (typeof value !== 'string') return ''

      const match = value.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/)

      return match
        ? formatMask(value, masks.cnpjMask)
        : value
    },
    formatCEP (value) {
      if (typeof value !== 'string') return ''

      const match = value.match(/^(\d{2})(\d{3})(\d{3})$/)

      return match
        ? formatMask(value, masks.cepMask)
        : value
    },
    formatName (value) {
      if (typeof value !== 'string') return ''

      return value.split(' ').filter(v => v.length > 2).slice(0, 2).join(' ')
    },
    formatPhone (value) {
      if (typeof value !== 'string') return ''

      const cleaned = value.replace(/[^\d]/g, '')
      let match

      if (cleaned.length === 11) {
        match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
      } else if (cleaned.length === 10) {
        match = cleaned.match(/^(\d{2})(\d{4})(\d{5})$/)
      }

      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
      }

      return value
    },
    formatPIS (value) {
      if (typeof value !== 'string') return ''

      const match = value.match(/^(\d{3})(\d{5})(\d{2})(\d{1})$/)

      return match
        ? formatMask(value, masks.pisMask)
        : value
    },
    formatPercentage (value, precision = 2) {
      if (typeof value === 'string') value = Number(value)
      if (typeof value !== 'number' || isNaN(value)) return null

      return value.toLocaleString('pt-BR', {
        maximumFractionDigits: precision
      }) + '%'
    },
    formatMoney (value) {
      if (typeof value === 'string') value = Number(value)
      if (typeof value !== 'number' || isNaN(value)) return null

      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    }
  }
}
