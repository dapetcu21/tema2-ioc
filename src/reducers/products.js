import { LOAD_FROM_DATABASE, COMMIT_CART } from '../constants/ActionTypes'

export default function products (state = [], action) {
  const { type, payload } = action
  switch (type) {
    case LOAD_FROM_DATABASE: {
      return payload.map(dbPub => {
        const subproducts = {
          main: { price: dbPub.price, stock: dbPub.stock }
        }
        if (dbPub.extra_price) {
          subproducts.extra = { price: dbPub.extra_price, stock: dbPub.extra_stock }
        }
        return {
          name: dbPub.name,
          subproducts
        }
      })
    }
    case COMMIT_CART: {
      const newState = [ ...state ]
      for (let productId_ in payload) {
        const cartItem = payload[productId_]
        const productId = parseInt(productId_)
        const newProduct = { ...newState[productId] }
        newState[productId] = newProduct
        const newSubproducts = { ...newProduct.subproducts }
        newProduct.subproducts = newSubproducts
        if (newSubproducts.main) {
          newSubproducts.main = { ...newSubproducts.main, stock: newSubproducts.main.stock - cartItem.main }
        }
        if (newSubproducts.extra) {
          newSubproducts.extra = { ...newSubproducts.extra, stock: newSubproducts.extra.stock - cartItem.extra }
        }
      }
      return newState
    }
  }
  return state
}
