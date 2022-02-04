import React from "react";
import styles from "./ShopPage.module.css";
import { PureComponent } from "react";
import PageComponent from "./PageComponent";
import { GRAPHQL_API, GET_CATEGORY } from "../utils/Constants";
import axios from "axios";

class ShopPage extends PureComponent {
  componentDidMount() {
    const getCategoryFromGraph = async () => {
      const queryResult = await axios.post(GRAPHQL_API, {
        query: GET_CATEGORY,
      });

      const result = queryResult.data.data;
      this.props.updateCategories(result.categories);
    };

    getCategoryFromGraph();
  }

  render() {
    return (
      <>
        <div className={styles.content}>
          <div className={styles.category_name}>
            <h1>{this.props.product.name}</h1>
          </div>
          <section>
            <ul className={styles.product}>
              {this.props.product.products === undefined
                ? null
                : this.props.product.products.map((product, index) => (
                    <PageComponent
                      index={index}
                      currency={this.props.currency}
                      cart={this.props.cart}
                      product={product}
                      handleOnClickAdd={this.props.handleOnClickAdd}
                    />
                  ))}
            </ul>
          </section>
        </div>
      </>
    );
  }
}

export default ShopPage;
