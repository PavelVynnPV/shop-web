import React from "react";
import { PureComponent } from "react";
import { Link } from "react-router-dom";
import styles from "./ShopPage.module.css";
import { whiteCart } from "../utils/Icons";
import {currencySignMap} from "../utils/Constants";

class PageComponent extends PureComponent {
  isFavourite = () => {
    const isFavourite = Boolean(
      this.props.cart.find(
        (favouriteProduct) => favouriteProduct.id === this.props.product.id
      )
    );
    return isFavourite;
  };

  priceSwitcher = () => {
    const price = this.props.product.prices.find((price) => {
      if (price.currency === this.props.currency) {
        return price;
      } else return null;
    });
    if (price.amount >= 1000) return Math.floor(price.amount).toLocaleString();
    return price.amount.toFixed(0);
  };

  render() {
    const product = this.props.product;
    return (
      <>
        <li key={this.props.index} className={styles.product_block}>
          <div className={styles.tyle}>
            <button
              disabled={
                product.inStock === false
                  ? true
                  : false
              }
              onClick={() => this.props.handleOnClickAdd(product)}
              className={styles.activeCart}
            >
              {whiteCart}
            </button>
            <Link
              className={styles.product_text_decoration}
              to={`/productpage/${product.id}`}
            >
              <div className={styles.image_block}>
                <img src={product.gallery[0]} alt="" />
              </div>
              <h2
                className={
                  product.inStock === false
                    ? styles.outOfStock
                    : styles.unActive
                }
              >
                OUT OF STOCK
              </h2>
              <p>
                <span>{product.brand} </span>
                {product.name}
              </p>
              <div className={styles.product_currency}>
                <span>{currencySignMap[this.props.currency]}</span>
                <span>{this.priceSwitcher()}</span>
              </div>
            </Link>
          </div>
        </li>
      </>
    );
  }
}

export default PageComponent;
