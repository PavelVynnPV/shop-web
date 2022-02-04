import { PureComponent } from "react";
import "../ProductInfo/ColorBoxes.css";

export default class AttributeComponent extends PureComponent {
  render() {
    const attr = this.props.attr;
    const styles = this.props.styles;
    const attribute = this.props.attribute;
    return (
      <>
        {attribute[attr] !== undefined ? (
          <span className={styles.attrName}>{attr + ":"}</span>
        ) : null}
        <span
          className={
            attr === "color"
              ? attribute[attr]
              : attribute[attr] === undefined
              ? null
              : styles.attr
          }
        >
          {attr === "color" ? null : attribute[attr]}
        </span>
      </>
    );
  }
}
