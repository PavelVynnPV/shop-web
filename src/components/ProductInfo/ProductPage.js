import { PureComponent } from "react";
import axios from "axios";
import { GRAPHQL_API, GET_ID } from "../utils/Constants";
import styles from "./ProductPage.module.css";
import ProductPageComponent from "./ProductPageComponent";

class ProductPage extends PureComponent {
  state = {
    product: {},
    gallery: [],
    prices: [],
    imageSrc: null,
  };

  componentDidMount() {
    let id = window.location.href.slice(39);
    const fetchDataId = async () => {
      const queryResult = await axios.post(GRAPHQL_API, {
        query: GET_ID(id),
      });

      const result = queryResult.data.data;
      this.setState({
        product: result.product,
        gallery: result.product.gallery,
        prices: result.product.prices,
        attributes: result.product.attributes,
      });
    };

    fetchDataId();
  }

  priceSwitcher() {
    const price = this.state.product.prices.find((price) => {
      if (price.currency === this.props.currency) {
        return price;
      } else return null;
    });
    if (price.amount >= 1000) return Math.floor(price.amount).toLocaleString();
    return price.amount.toFixed(0);
  }

  render() {
    const gallery = this.state.gallery;
    const product = this.state.product;
    const attributes = this.state.attributes;
    if (product.prices === undefined) return null;
    return (
      <div className={styles.content}>
        <div className={styles.main_info_block_left}>
          <ul className={styles.gallery_container}>
            {gallery.map((img, index) => (
              <li key={index} className={styles.images}>
                <div className={styles.images_block}>
                  <img
                    className={styles.gallery}
                    onClick={(e) => this.setState({ imageSrc: e.target.src })}
                    src={img}
                    alt="img"
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.main_img_container}>
            <div className={styles.main_img_under_container}>
              <div className={styles.main_img_block}>
                <img
                  className={styles.main_img}
                  src={
                    this.state.imageSrc === null
                      ? this.state.gallery[0]
                      : this.state.imageSrc
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main_info_block_right}>
          <ProductPageComponent
            product={product}
            attributes={attributes}
            styles={styles}
            handleOnClickAdd={this.props.handleOnClickAdd}
            priceSwitcher={this.priceSwitcher()}
            prices={this.state.prices}
            currency={this.props.currency}
          />
        </div>
      </div>
    );
  }
}
export default ProductPage;
