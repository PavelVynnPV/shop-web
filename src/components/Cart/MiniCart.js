import { PureComponent } from "react";
import CartComponent from "./CartComponent";
import styles from "./MiniCart.module.css";
import { Link } from "react-router-dom";
import {currencySignMap} from "../utils/Constants";
import Pagination from "../Pagination/Pagination";

class MiniCart extends PureComponent {
  state = {
    pageUrl: "",
    currentPage: 1,
    jokesPerPage: 2,
  };

  updateCurrentPage = (value) => {
    this.setState({ currentPage: value });
  };

  totalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      const price = this.props.cart[i].prices.find((price) => {
        if (price.currency === this.props.currency) {
          return price;
        } else return null;
      });
      totalPrice += price.amount * this.props.cart[i].qty;
    }
    if (totalPrice >= 1000) return Math.trunc(totalPrice).toLocaleString();
    return Math.floor(totalPrice);
  }

  render() {
    ///pagination
    const currentPage = this.state.currentPage;
    const cartPerPage = this.state.jokesPerPage;
    const cart = this.props.cart;
    const reducedCart = Object.values(this.props.reducedCart);

    const indexOfLastCart = currentPage * cartPerPage;
    const indexOfFirstCart = indexOfLastCart - cartPerPage;
    const currentCart = reducedCart.slice(indexOfFirstCart, indexOfLastCart);
    const howManyPages = Math.ceil(cart.length / cartPerPage);
    ///totalPrice
    return (
      <>
        <div className={styles.hover_block_cart}>
          <h2 className={styles.myBag}>
            <span>My Bag</span>, {this.props.quantity} items
          </h2>
          {currentCart.map((cart) =>
            cart.map((el, index) => (
              <CartComponent
                index={index}
                reducedCart={reducedCart}
                currency={this.props.currency}
                cartItem={el}
                handleOnClickRemove={this.props.handleOnClickRemove}
                handleOnClickAdd={this.props.handleOnClickAdd}
                styles={styles}
              />
            ))
          )}

          {reducedCart.length > 2 ? (
            <Pagination
              currentCart={currentCart}
              pages={howManyPages}
              updateCurrentPage={this.updateCurrentPage}
            />
          ) : null}
          {this.totalPrice() === 0 ? null : (
            <p className={styles.total_price}>
              Total : {currencySignMap[this.props.currency]}
              {this.totalPrice()}
            </p>
          )}
          <Link
            to="/cartpage"
            onClick={() => this.props.updateMiniCartStatus()}
          >
            <button className={styles.cartpage_btn}>VIEW BAG</button>
          </Link>
          <Link to="/checkout">
            <button
              disabled={cart.length === 0 ? true : false}
              className={styles.cartpage_btn}
            >
              CHECK OUT
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default MiniCart;
