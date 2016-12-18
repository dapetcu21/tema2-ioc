import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, COMMIT_CART } from '../constants/ActionTypes'

export default function cart (state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case COMMIT_CART:
    case CLEAR_CART:
      return {}
    case ADD_TO_CART: {
      const { productId, subproductId, quantity } = payload
      const oldEntry = state[productId] || { main: 0, extra: 0 }
      const newEntry = { ...oldEntry, [subproductId]: oldEntry[subproductId] + quantity }
      return { ...state, [productId]: newEntry }
    }
    case REMOVE_FROM_CART: {
      const { productId, subproductId, quantity } = payload
      const oldEntry = state[productId]
      if (!oldEntry) { return state }
      const newEntry = { ...oldEntry, [subproductId]: oldEntry[subproductId] - quantity }
      if (newEntry.main < newEntry.extra) { newEntry.extra = newEntry.main }
      const newState = { ...state, [productId]: newEntry }
      if (newEntry.main <= 0 && newEntry.extra <= 0) {
        delete newState[productId]
      }
      return newState
    }
  }
  return state
}
