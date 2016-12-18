import React, { Component } from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import styles from './NavBarPage.scss'

import { loadFromDatabase, toggleCart } from '../actions/CartActions'

const formatPrice = (price) =>
  Math.floor(price).toString() +
  '.' +
  Math.floor((price + 1) * 100).toString().substr(-2)

@connect(state => ({
  cartShown: state.cartShown,
  cart: state.cart,
  products: state.products
}))
export default class NavBarPage extends Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  componentWillMount () {
    this.props.dispatch(loadFromDatabase())
  }

  toggleCart = (evt) => {
    this.props.dispatch(toggleCart())
    evt.stopPropagation()
    evt.preventDefault()
  }

  render () {
    const { cartShown, cart, products } = this.props

    let productCount = 0
    let totalCost = 0

    for (let productId in cart) {
      const product = products[parseInt(productId)]
      const cartItem = cart[productId]
      productCount += cartItem.main
      productCount += cartItem.extra
      if (cartItem.main) {
        totalCost += cartItem.main * product.subproducts.main.price
      }
      if (cartItem.extra) {
        totalCost += cartItem.extra * product.subproducts.extra.price
      }
    }

    return (
      <div className={styles.container}>
        <Navbar fixedTop>
          <Navbar.Header className={styles.navbar}>
            <Navbar.Brand className={styles.navbarBrand}>
              <i className='fa fa-home' />
              &nbsp; {productCount
                ? `${productCount} ${productCount === 1 ? 'produs' : 'produse'} în coș`
                : 'Selectează produse:'
              }
            </Navbar.Brand>
            {productCount !== 0 && (
              <div className={styles.navbarButtonContainer}>
                <Button onClick={this.toggleCart} active={cartShown} bsStyle='primary'>
                  <i className='fa fa-shopping-cart' />
                  &nbsp; {formatPrice(totalCost)} RON
                </Button>
              </div>
            )}
          </Navbar.Header>
        </Navbar>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
