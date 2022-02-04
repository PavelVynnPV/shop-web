import { PureComponent } from "react";
import { currencySignMap } from "../utils/Constants";
import parser from "html-react-parser";
import "./ColorBoxes.css";

export default class ProductPageComponent extends PureComponent {
  state = {
    isChecked: false,
  };

  attributeName(attrName) {
    if (attrName === "Color") return "color";
    if (attrName === "Size") return "size";
    if (attrName === "Capacity") return "capacity";
    if (attrName === "With USB 3 ports") return "withUSB";
    if (attrName === "Touch ID in keyboard") return "inTouch";
  }

  render() {
    const product = this.props.product;
    const styles = this.props.styles;
    const isChecked = this.state.isChecked;
    const attributes = this.props.attributes;
    return (
      <>
        <h1>{product.brand}</h1>
        <h2>{product.name}</h2>
        <div className={styles.size}>
          {attributes.map((attribute, index) => (
            <div key={index} className={styles.size_attribute}>
              <p>{attribute.name}:</p>
              <div className={styles.attr_items}>
                {attribute.items.map((item, index) => (
                  <div key={index} className={styles.attr_item}>
                    <label>
                      <input
                        className={styles.unActive}
                        type="radio"
                        name={this.attributeName(attribute.name)}
                        value={item.id}
                        onClick={(e) =>
                          this.setState({
                            [e.target.name]: e.target.value,
                            isChecked: e.target.checked,
                          })
                        }
                      />
                      <span
                        className={
                          attribute.name === "Color"
                            ? item.id
                            : styles.active_attr_input
                        }
                      >
                        {attribute.name === "Color" ? null : item.id}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.prices}>
          <span>PRICE:</span>
          {this.props.prices[0] === undefined ? null : (
            <span className={styles.price}>
              {currencySignMap[this.props.currency]}
              {this.props.priceSwitcher}
            </span>
          )}
        </div>
        <button
          disabled={
            isChecked === false
              ? true
              : product.inStock === false
              ? true
              : false
          }
          onClick={() =>
            this.props.handleOnClickAdd(
              product,
              this.state.color,
              this.state.capacity,
              this.state.withUSB,
              this.state.size,
              this.state.inTouch
            )
          }
        >
          ADD TO CART
        </button>
        {parser(`<p>${product.description}</p>`)}
      </>
    );
  }
}
