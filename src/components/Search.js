import React, { Component } from "react";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSearch(event) {
    event.preventDefault();
    this.props.handleSearch(this.state.searchInput);
  }

  render() {
    return (
      <form className="search">
        <input
          autoFocus
          className="search__input"
          type="text"
          name="searchInput"
          value={this.state.searchInput}
          onChange={this.handleChange}
          placeholder="Search by name"
        />
        <input
          className="search__button"
          type="submit"
          onClick={this.handleSearch}
        />
      </form>
    );
  }
}

export default Search;
