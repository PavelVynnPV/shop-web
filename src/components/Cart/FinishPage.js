import { PureComponent } from "react";
import React from "react";
import styles from "./Checkout.module.css";

const src = "https://www.epschool.org/wp-content/uploads/2021/08/Congratulations.jpg";

class FinishPage extends PureComponent {
  render() {
    return (
      <>
        <div>
          <img
            className={styles.finish_img}
            src={src}
            alt=""
          />
        </div>
      </>
    );
  }
}

export default FinishPage;
