import React, { Component } from 'react'
import { Grid, Row, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import Product from './Product'
import styles from './RootPage.scss'

import { clearCart, commitCart, toggleCart } from '../actions/CartActions'

@connect(state => ({
  products: state.products,
  cart: state.cart,
  cartShown: state.cartShown
}))
export default class RootPage extends Component {
  commitCart = () => {
    this.props.dispatch(commitCart(this.props.cart))
    this.props.dispatch(toggleCart())
  }

  clearCart = () => {
    this.props.dispatch(clearCart())
    this.props.dispatch(toggleCart())
  }

  render () {
    const { products, cart, cartShown } = this.props

    return (
      <Grid>
        {products.map((product, idx) => (
          (!cartShown || cart[idx]) &&
            <Product
              key={idx}
              product={product}
              productId={idx}
              cartItem={cart[idx]}
              cartShown={cartShown}
            />
        ))}
        {cartShown && (
          <Row className={styles.cartButtons}>
            <Button bsStyle='primary' onClick={this.commitCart} block>
              <i className='fa fa-fw fa-money' />
              &nbsp; Salvează
            </Button>
            <div className={styles.cartButtonsSeparator} />
            <Button bsStyle='danger' onClick={this.clearCart} block>
              <i className='fa fa-fw fa-trash-o' />
              &nbsp; Golește coș
            </Button>
          </Row>
        )}
      </Grid>
    )
  }
}
