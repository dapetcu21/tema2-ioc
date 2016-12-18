import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import { connect } from 'react-redux'

import { addToCart, removeFromCart } from '../actions/CartActions'

import styles from './Product.scss'

const formatPrice = (price) =>
  Math.floor(price).toString() +
  '.' +
  Math.floor((price + 1) * 100).toString().substr(-2)

@connect()
class Subproduct extends Component {
  addToCart = (evt) => {
    this.props.dispatch(addToCart(this.props.productId, this.props.id))
    evt.stopPropagation()
  }

  removeFromCart = (evt) => {
    this.props.dispatch(removeFromCart(this.props.productId, this.props.id))
    evt.stopPropagation()
  }

  render () {
    const { name, stock, inCart, maxInCart, price } = this.props
    const canAdd = inCart < stock && inCart < maxInCart
    const canRemove = inCart > 0
    const addMode = canAdd ? '' : (' ' + styles.addDisabled)
    return (
      <div className={styles.subproduct} onClick={canAdd && this.addToCart}>
        <div className={styles.subproductTitleContainer + addMode}>
          <div className={styles.subproductName}>{name}</div>
          <div className={styles.subproductStock}>{stock} în stoc</div>
        </div>
        {canRemove && <div className={styles.subproductRemove} onClick={this.removeFromCart}>
          <i className='fa fa-fw fa-lg fa-trash-o' />
        </div>}
        <div className={styles.subproductPriceQuantity}>
          <span className={styles.subproductQuantity + (inCart ? '' : (' ' + styles.subproductQuantityZero))}>
            {inCart} &times;&nbsp;
          </span>
          <span className={styles.subproductPrice}>{formatPrice(price)} RON</span>
        </div>
      </div>
    )
  }
}

const defaultCartItem = { main: 0, extra: 0 }

export default class Product extends Component {
  render () {
    const { product, productId, cartItem = defaultCartItem, cartShown } = this.props
    return (
      <Row className={styles.container}>
        <div className={styles.iconContainer}>
          <i className='fa fa-fw fa-2x fa-newspaper-o' />
        </div>
        <div className={styles.subproducts}>
          <Subproduct
            productId={productId}
            id='main'
            name={product.name}
            stock={product.subproducts.main.stock}
            price={product.subproducts.main.price}
            inCart={cartItem.main}
            maxInCart={Infinity}
          />
          {product.subproducts.extra && (!cartShown || cartItem.extra !== 0) &&
            <Subproduct
              productId={productId}
              id='extra'
              name='Extra'
              stock={product.subproducts.extra.stock}
              price={product.subproducts.extra.price}
              inCart={cartItem.extra}
              maxInCart={cartItem.main}
            />
          }
        </div>
      </Row>
    )
  }
}
