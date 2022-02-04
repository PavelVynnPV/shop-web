import React, { PureComponent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopPage } from "./components/MainPages";
import { Navbar } from "./components/Navbar";
import { ProductPage } from "./components/ProductInfo";
import CartPage from "./components/Cart/CartPage";
import Checkout from "./components/Cart/Checkout";
import FinishPage from "./components/Cart/FinishPage";
import _ from "lodash";

class App extends PureComponent {
  state = {
    cart: [],
    categories: [],
    clothes: [],
    tech: [],
    currency: "USD",
  };

  handleOnClickAdd = (product, color, capacity, withUSB, size, inTouch) => {
    this.setState({
      cart: [
        ...this.state.cart,
        {
          ...product,
          qty: 1,
          attr: { color, capacity, size, withUSB, inTouch },
        },
      ],
    });
  };

  handleOnClickRemove = (product) => {
    const cart = this.state.cart;
    const reducedCart = Object.values(this.reduceCart());
    reducedCart.map((reducedCartItem) => {
      let exist = reducedCartItem.find(
        (x) => JSON.stringify(x.attr) === JSON.stringify(product.attr)
      );
      if (exist === undefined) return null;
      if (exist.qty === 1) {
        this.setState({
          cart: cart.filter(
            (x) => JSON.stringify(x.attr) !== JSON.stringify(exist.attr)
          ),
        });
      } else {
        this.setState(
          cart.find((x) =>
            JSON.stringify(x.attr) === JSON.stringify(product.attr)
              ? { cart: cart.splice(cart.indexOf(x), 1) }
              : null
          )
        );
      }
      return exist;
    });
  };

  reduceCart = () => {
    const clonedCart = _.cloneDeep(this.state.cart);
    const reduced = clonedCart.reduce((acc, item) => {
      const itemAttr = Object.values(item.attr).map((key) => {
        return key;
      });
      if (!acc[itemAttr]) {
        acc[itemAttr] = [];
        acc[itemAttr].push(item);
      } else {
        acc[itemAttr].forEach((el) => el.qty++);
      }
      return acc;
    }, {});
    return reduced;
  };

  componentDidUpdate() {
    this.state.categories.map((category) => {
      if (category.name === "clothes") {
        return this.setState({ clothes: category });
      } else return this.setState({ tech: category });
    });
  }

  updateCurrency = (value) => {
    this.setState({ currency: value });
  };

  updateCategories = (value) => {
    this.setState({ categories: value });
  };

  render() {
    console.log(this.state.categories)
    return (
      <Router>
        <Navbar
          currencies={this.state.currencies}
          updateCurrency={this.updateCurrency}
          currency={this.state.currency}
          cart={this.state.cart}
          reducedCart={this.reduceCart()}
          handleOnClickAdd={this.handleOnClickAdd}
          handleOnClickRemove={this.handleOnClickRemove}
        />
        <Routes>
          <Route
            path="/shop-web"
            element={
              <ShopPage
                updateCategories={this.updateCategories}
                product={this.state.tech}
                currency={this.state.currency}
                cart={this.state.cart}
                handleOnClickAdd={this.handleOnClickAdd}
              />
            }
          />
          <Route
            exact
            path="/clothespage"
            element={
              <ShopPage
                updateCategories={this.updateCategories}
                product={this.state.clothes}
                currency={this.state.currency}
                cart={this.state.cart}
                handleOnClickAdd={this.handleOnClickAdd}
              />
            }
          />
          <Route
            exact
            path="/productpage/:id"
            element={
              <ProductPage
                currency={this.state.currency}
                cart={this.state.cart}
                handleOnClickAdd={this.handleOnClickAdd}
                handleOnClickRemove={this.handleOnClickRemove}
              />
            }
          />
          <Route
            exact
            path="/cartpage"
            element={
              <CartPage
                attr={this.state.attr}
                currency={this.state.currency}
                cart={this.state.cart}
                reducedCart={this.reduceCart()}
                handleOnClickAdd={this.handleOnClickAdd}
                handleOnClickRemove={this.handleOnClickRemove}
              />
            }
          />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/finishpage" element={<FinishPage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
