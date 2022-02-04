import { PureComponent } from "react";
import styles from "./CartPage.module.css";
import CartComponent from "./CartComponent";

class CartPage extends PureComponent {
  render() {
    const reducedCart = Object.values(this.props.reducedCart);

    return (
      <>
        <div className={styles.content}>
          <h1>CART</h1>
          {reducedCart.map((cart) =>
            cart.map((el) => (
              <CartComponent
                currency={this.props.currency}
                cartItem={el}
                handleOnClickAdd={this.props.handleOnClickAdd}
                handleOnClickRemove={this.props.handleOnClickRemove}
                styles={styles}
              />
            ))
          )}
        </div>
      </>
    );
  }
}

export default CartPage;
