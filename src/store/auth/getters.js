export function getUser (state) {
  return state.user
}

export function getAccessLevel (state) {
  if (!state.user) return 'App'

  switch (state.user.type) {
    case 'Administrador':
    case 'Analista':
      return 'Dashboard'
    default:
      return 'App'
  }
}

export function isClient (state) {
  return state.user?.type === 'Cliente'
}

export function isPartner (state) {
  return state.user?.type === 'Parceiro'
}

export function isAnalyst (state) {
  return state.user?.type === 'Analista'
}

export function isAdmin (state) {
  return state.user?.type === 'Administrador'
}

export function isAuthenticated (state) {
  return Boolean(state.user)
}
