import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    bla: "0",
  };

  handleIncrement = (product) => {
    console.log(product);
    // This increment the variable count
    this.state.count++;

    // This will let react know that the variable was changed
    this.setState(this.state);
  };

  render() {
    return (
      <div>
        <span className={this.getClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => {
            this.handleIncrement({ id: "product-id" });
          }}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
      </div>
    );
  }

  getClasses() {
    let classes = "badge m-2 ";
    classes += this.state.count === 0 ? "badge-warning" : "badge-primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
