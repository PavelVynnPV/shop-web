import { PureComponent } from "react";
import styles from "./Navbar.module.css";
import { currencySignMap, GET_CURRENCY, GRAPHQL_API } from "../utils/Constants";
import { cart } from "../utils/Icons";
import { Link } from "react-router-dom";
import MiniCart from "../Cart/MiniCart";
import logo from "../utils/logo.png";
import axios from "axios";

const techHost = "https://irubakai.github.io/shop-web";
const clothHost = "https://irubakai.github.io/clothespage";

class Navbar extends PureComponent {
  state = {
    currencySign: "$",
    currency: "USD",
    miniCartStatus: "unActive",
    switcherStatus: "unActive",
    currencies: []
  };

  componentDidMount() {
    const getCategoryFromGraph = async () => {
      const queryResult = await axios.post(GRAPHQL_API, {
        query: GET_CURRENCY,
      });

      const result = queryResult.data.data;
      this.setState({currencies: result.currencies})
    };

    getCategoryFromGraph();
  }

  statusCart() {
    if (this.state.miniCartStatus === "unActive") {
      this.setState({ miniCartStatus: "active" });
    } else this.setState({ miniCartStatus: "unActive" });
  }

  statusSwitcher() {
    if (this.state.switcherStatus === "unActive") {
      this.setState({ switcherStatus: "active" });
    } else this.setState({ switcherStatus: "unActive" });
  }

  updateMiniCartStatus = () => {
    this.setState({ miniCartStatus: "unActive" });
  };

  quntityValue() {
    let quantity = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      quantity += this.props.cart[i].qty;
    }
    return quantity;
  }

  render() {
    return (
      <div>
        <div
          className={
            this.state.miniCartStatus === "active"
              ? styles.miniCart_overlay
              : null
          }
          onClick={() => this.setState({ miniCartStatus: "unActive" })}
        ></div>
        <div
          className={
            this.state.switcherStatus === "active"
              ? styles.switcher_overlay
              : null
          }
          onClick={() => this.setState({ switcherStatus: "unActive" })}
        ></div>
        <nav>
          <ul className={styles.nav_links}>
            <li>
              <Link
                className={
                  techHost === window.location.href ? styles.activeUrl : null
                }
                onClick={(e) => this.setState({ urlStatus: e.target.href })}
                to="/shop-web"
              >
                Tech
              </Link>
            </li>
            <li>
              <Link
                className={
                  clothHost === window.location.href ? styles.activeUrl : null
                }
                onClick={(e) => this.setState({ urlStatus: e.target.href })}
                to="/clothespage"
              >
                Clothes
              </Link>
            </li>
          </ul>

          <Link
            className={styles.nav_logo}
            to="/shop-web"
            onClick={(e) => this.setState({ urlStatus: e.target.href })}
          >
            <img className={styles.nav_logo} src={logo} alt="" />
          </Link>

          <div className={styles.nav_card}>
            <div className={styles.switcher}>
              <p
                className={
                  this.state.switcherStatus === "active"
                    ? styles.swithcerOpen
                    : styles.switcherClose
                }
                onClick={() => {
                  this.statusSwitcher();
                  this.setState({ miniCartStatus: "unActive" });
                }}
              >
                {this.state.currencySign}
              </p>
              <ul
                className={
                  this.state.switcherStatus === "active"
                    ? styles.switcher_list
                    : styles.unActive
                }
              >
                {this.state.currencies.map((currency, index) => (
                  <>
                    <li
                      value={currency}
                      key={index}
                      onClick={() => {
                        this.props.updateCurrency(currency);
                        this.setState({
                          currencySign: currencySignMap[currency],
                          currency: currency,
                          switcherStatus: "unActive",
                        });
                      }}
                    >
                      {currencySignMap[currency]} {currency}
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <span
              className={styles.nav_card_icon}
              onClick={() => {
                this.statusCart();
                this.setState({ switcherStatus: "unActive" });
              }}
            >
              {cart}
            </span>
            <span
              className={
                this.quntityValue() >= 1
                  ? styles.favourites_number
                  : styles.unActive
              }
            >
              {this.quntityValue()}
            </span>
            {this.state.miniCartStatus === "active" ? (
              <MiniCart
                updateMiniCartStatus={this.updateMiniCartStatus}
                attr={this.props.attr}
                reducedCart={this.props.reducedCart}
                quantity={this.quntityValue()}
                currency={this.state.currency}
                cart={this.props.cart}
                handleOnClickAdd={this.props.handleOnClickAdd}
                handleOnClickRemove={this.props.handleOnClickRemove}
                styles={styles}
              />
            ) : null}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
