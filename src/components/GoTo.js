import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

class GoTo extends Component {
  constructor() {
    super();
    this.state = {
      pageInput: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleGoToPage = this.handleGoToPage.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClickOutside() {
    this.props.handleClickOutside();
  }

  handleGoToPage(event) {
    event.preventDefault();
    this.props.handleGoToPage(this.state.pageInput);
  }

  render() {
    return (
      <form className="goTo__form">
        <input
          autoFocus
          className="pageInput"
          type="number"
          name="pageInput"
          value={this.state.pageInput}
          onChange={this.handleChange}
        />
        <button className="button" type="submit" onClick={this.handleGoToPage}>
          Go to page
        </button>
      </form>
    );
  }
}

export default onClickOutside(GoTo);
