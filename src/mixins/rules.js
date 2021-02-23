/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
import Vue from 'vue'
import { date } from 'quasar'
import { formatters } from 'src/mixins'

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const checkEqualNumbers = (str) => {
  if (process.env.DEV) return false
  const letter = str.charAt(0)
  for (let i = 1; i < str.length; i++) {
    if (letter !== str.charAt(i)) {
      return false
    }
  }
  return true
}

export const getDateTime = timeStamp => {
  if (typeof timeStamp !== 'string') return []
  const [date, time] = timeStamp.split(/[\sT\.]/)

  return [date, time]
}

export default {
  mixins: [formatters],
  methods: {
    required (val, msg) {
      msg = msg ?? 'O campo acima é obrigatório.'
      if (typeof val === 'string') return (val && val.trim().length > 0) || msg

      return !!val || msg
    },
    requiredAllowZero (val, msg) {
      msg = msg ?? 'O campo acima é obrigatório.'
      if (typeof val === 'string') return (val && val.trim().length > 0) || msg

      return !!val || val === 0 || msg
    },
    email (val, msg) {
      return (typeof val === 'string' && emailPattern.test(val)) || (msg || 'Por favor insira um e-mail válido.')
    },
    enum (val, arr, msg) {
      return arr.includes(val) || (msg || 'Valor inválido, por favor selecione um válido.')
    },
    sameAs (val, refVal, msg) {
      return val === refVal || (msg || 'Os campos não são iguais.')
    },
    maxValue (val, max, msg) {
      return (typeof val === 'number' && val <= max) || (msg || `Não é permitido valor acima de ${max}.`)
    },
    maxValueMoney (val, max = 9999999.99, msg) {
      return (typeof val === 'number' && val <= max) || (msg || `Não é permitido valor acima de R$${this.formatMoney(max)}.`)
    },
    maxLength (val, max, msg) {
      return (typeof val === 'string' && val.length <= max) || (msg || `Limite máximo de ${max} caracteres.`)
    },
    minValue (val, min, msg) {
      return (typeof val === 'number' && val >= min) || (msg || `Não é permitido valor abaixo de ${min}.`)
    },
    minLength (val, min, msg) {
      return (typeof val === 'string' && val.length >= min) || (msg || `Limite mínimo de ${min} caracteres.`)
    },
    minValidAge (val, min, msg) {
      return date.subtractFromDate(new Date(), { year: min }) > date.extractDate(val, 'DD/MM/YYYY') || (msg || `É necessário ter ${min} anos para continuar.`)
    },
    notNegative (val, msg) {
      return (typeof val === 'number' && val >= 0) || (msg || 'O valor não pode ser negativo.')
    },
    async sellerNotRegistered (val, msg) {
      try {
        await Vue.prototype.$axios.get(`people/${val}?type=salesman`)
        return msg || 'Vendedor já cadastrado'
      } catch (error) {
        if (error.response.status === 404) return true
      }
    },
    validPhone (val, msg) {
      return (typeof val === 'string' && val.length > 9 && val.length < 12) || (msg || 'Por favor insira um telefone válido.')
    },
    validName (val, msg) {
      return (typeof val === 'string' && val.trim().split(' ').filter(s => s.length >= 3).length > 1) || (msg || 'Por favor, digite nome e sobrenome.')
    },
    validCPF (val = '', msg = 'Por favor, insira um CPF válido') {
      if (process.env.DEV) return true
      let sum = 0, mod

      if (
        typeof val !== 'string' ||
        val.length !== 11 ||
        checkEqualNumbers(val)
      ) return msg

      for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(val.substring(i - 1, i)) * (11 - i)
      }
      mod = (sum * 10) % 11

      if ((mod == 10) || (mod == 11)) {
        mod = 0
      }

      if (mod != parseInt(val.substring(9, 10))) return msg

      sum = 0
      for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(val.substring(i - 1, i)) * (12 - i)
      }
      mod = (sum * 10) % 11

      if ((mod == 10) || (mod == 11)) {
        mod = 0
      }
      if (mod != parseInt(val.substring(10, 11))) return msg

      return true
    },
    validPIS (val = '', msg = 'Por favor, insira um PIS válido') {
      if (process.env.DEV) return true
      let sum = 0, mod
      const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

      if (
        typeof val !== 'string' ||
        val.length !== 11 ||
        checkEqualNumbers(val)
      ) return msg

      for (let i = 1; i <= 10; i++) {
        sum += parseInt(val.substring(i - 1, i)) * weights[i - 1]
      }
      mod = 11 - sum % 11

      if ((mod == 10) || (mod == 11)) {
        mod = 0
      }

      if (mod != parseInt(val.substring(10))) return msg

      return true
    },
    validCNPJ (val = '', msg = 'Por favor, insira um CNPJ válido') {
      if (process.env.DEV) return true
      if (
        typeof val !== 'string' ||
        val.length !== 14 ||
        checkEqualNumbers(val)
      ) return msg

      let tamanho = val.length - 2
      let numeros = val.substring(0, tamanho)
      const digitos = val.substring(tamanho)
      let soma = 0
      let pos = tamanho - 7
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
      if (resultado != digitos.charAt(0)) return msg
      tamanho = tamanho + 1
      numeros = val.substring(0, tamanho)
      soma = 0
      pos = tamanho - 7
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
      if (resultado != digitos.charAt(1)) return msg

      return true
    },
    validCreditCard (value = '', msg = 'Número do cartão inválido.') {
      if (/[^0-9-\s]+/.test(value)) return msg

      let nCheck = 0, bEven = false
      value = value.replace(/\D/g, '')

      for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
          nDigit = parseInt(cDigit, 10)

        if (bEven && (nDigit *= 2) > 9) nDigit -= 9
        nCheck += nDigit
        bEven = !bEven
      }
      return ((nCheck % 10 == 0) && (nCheck !== 0)) || msg
    },
    validDate (val = '', msg = 'Por favor, insira uma data válida.') {
      return (typeof val === 'string' && date.isValid(this.formatDateReverse(val))) || msg
    },
    validNoFutureDates (val, msg) {
      const stringDate = this.formatDateReverse(val) + 'T00:00:00'
      const mydate = new Date(stringDate)
      const diff = date.getDateDiff(mydate, new Date(), 'days') > 0
      return (typeof val === 'string' && diff <= 0) || (msg || 'A data não pode ser futura')
    },
    validNoPastDates (val, msg) {
      const stringDate = this.formatDateReverse(val) + 'T00:00:00'
      const mydate = new Date(stringDate)
      const diff = date.getDateDiff(mydate, new Date(), 'days') > 0
      return (typeof val === 'string' && diff > 0) || (msg || 'A data não pode ser passada')
    },
    validCNH (val, msg) {
      return (typeof val === 'string' && val.length === 11) || (msg || 'CNH inválida')
    },
    greaterThanDate (val, ref, msg) {
      msg = msg ?? 'A data 1 precisa ser maior que a data 2'
      if (typeof val !== 'string') return msg

      let [date1] = getDateTime(val)
      date1 = date.extractDate(`${date1} 00:00:00`, 'YYYY-MM-DD HH:mm:ss')
      let [date2] = getDateTime(ref)
      date2 = date.extractDate(`${date2} 00:00:00`, 'YYYY-MM-DD HH:mm:ss')
      return date1 > date2 || msg
    },
    greaterOrEqualThanDate (val, ref, msg) {
      msg = msg ?? 'A data 1 precisa ser maior ou igual que a data 2'
      if (typeof val !== 'string') return msg

      let [date1] = getDateTime(val)
      date1 = date.extractDate(`${date1} 00:00:00`, 'YYYY-MM-DD HH:mm:ss')
      let [date2] = getDateTime(ref)
      date2 = date.extractDate(`${date2} 00:00:00`, 'YYYY-MM-DD HH:mm:ss')
      return date1 >= date2 || msg
    }
  }
}
