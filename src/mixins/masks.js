export const cpfMask = '###.###.###-##'
export const cnpjMask = '##.###.###/####-##'
export const cepMask = '##.###-###'
export const percentageMask = '##,## %'
export const cnhMask = '###########'
export const rgMask = '##############'
export const nationalRegMask = '###########'
export const pisMask = '###.#####.##-#'
export const phoneMask = (val = '') => {
  return typeof val === 'string' && val.length <= 10
    ? '(##) ####-#####'
    : '(##) #####-####'
}

export default {
  data: () => ({
    cpfMask,
    cnpjMask,
    cepMask,
    percentageMask,
    cnhMask,
    rgMask,
    nationalRegMask,
    pisMask
  }),
  methods: {
    phoneMask
  }
}
