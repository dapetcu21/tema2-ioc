import { TOGGLE_CART } from '../constants/ActionTypes'

export default (state = false, action) =>
  action.type === TOGGLE_CART ? !state : state
