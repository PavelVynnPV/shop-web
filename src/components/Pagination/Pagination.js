import styles from "./Pagination.module.css";
import { PureComponent } from "react";

class Pagination extends PureComponent {
  state = {
    currentButton: 1,
  };

  componentDidUpdate() {
    this.props.updateCurrentPage(this.state.currentButton);
  }

  render() {
    const numberOfPages = [];
    let pages = this.props.pages;
    for (let i = 1; i <= pages; i++) {
      numberOfPages.push(i);
    }
    return (
      <div className={styles.pagination_container}>
        <button
          className={styles.page_link}
          onClick={() =>
            this.setState((prev) => ({
              currentButton:
                prev.currentButton <= 1
                  ? prev.currentButton
                  : prev.currentButton - 1,
            }))
          }
        >
          &#8656; Prev
        </button>
        <button
          className={styles.page_link}
          onClick={() =>
            this.setState((prev) => ({
              currentButton:
                prev.currentButton >= numberOfPages.length
                  ? prev.currentButton
                  : prev.currentButton + 1,
            }))
          }
        >
          Next &#8658;
        </button>
      </div>
    );
  }
}
// this.setState({
//   currentButton: (prev) =>
//     prev >= numberOfPages.length ? prev : prev + 1,
// })
export default Pagination;
