import { PureComponent } from "react";
import React from "react";
import styles from "./Checkout.module.css";
import { Link } from "react-router-dom";

class Checkout extends PureComponent {
  state = {
    isActive: "active",
  };

  render() {
    return (
      <>
        <div className={styles.container}>
          <h3 className={styles.title}>Shipping adress</h3>
          <section>
            <form>
              <label for="First Name">
                First Namespan *
                <input
                  type="text"
                  name="First Name"
                  placeholder="John"
                  required
                />
              </label>
              <label for="Last Name">
                Last Name *
                <input type="text" name="Last Name" placeholder="Vinson" />
              </label>
              <label for="Adress">
                Adress *
                <input
                  type="text"
                  name="Adress"
                  placeholder="14 Parmezano street"
                />
              </label>
              <label for="Email">
                Email *
                <input
                  type="text"
                  name="Email"
                  placeholder="John@example.com"
                />
              </label>
              <label for="City">
                City *
                <input type="text" name="City" placeholder="Lovinstone" />
              </label>
              <label for="Country">
                Country *
                <input type="text" name="Country" placeholder="England" />
              </label>
            </form>
          </section>
          <Link to="/finishpage">
              <button className={styles.btn}>Finish</button>
            </Link>
        </div>
      </>
    );
  }
}

export default Checkout;
