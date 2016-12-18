import { createAction } from 'redux-actions'

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  COMMIT_CART,
  TOGGLE_CART,
  LOAD_FROM_DATABASE
} from '../constants/ActionTypes'

import database from './database.json'

export const addToCart = createAction(ADD_TO_CART, (productId, subproductId, quantity = 1) => ({ productId, subproductId, quantity }))
export const removeFromCart = createAction(REMOVE_FROM_CART, (productId, subproductId, quantity = 1) => ({ productId, subproductId, quantity }))
export const clearCart = createAction(CLEAR_CART)
export const commitCart = createAction(COMMIT_CART)
export const toggleCart = createAction(TOGGLE_CART)
export const loadFromDatabase = createAction(LOAD_FROM_DATABASE, () => database)
