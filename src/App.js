import React, { Component, Fragment } from "react";
import axios from "axios";
import Search from "./components/Search";
import GoTo from "./components/GoTo";
import ResultsTable from "./components/ResultsTable";
import SortByMenu from "./components/SortByMenu";
import ResultsPerPageMenu from "./components/ResultsPerPageMenu";
import PageCounter from "./components/PageCounter";
import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentData: [],
      pageCount: 1,
      currentPage: 1,
      currentSearchTerm: "",
      resultsPerPage: 25,
      loading: true,
      toggleGoTo: "",
      orderBy: "name",
      orderDirection: "asc",
      sortByDisplay: "Name (ascending)"
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.getSearchData = this.getSearchData.bind(this);
    this.getSearchDataPageCount = this.getSearchDataPageCount.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.resetCurrentPage = this.resetCurrentPage.bind(this);
    this.handleResultsSelect = this.handleResultsSelect.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleGoToPage = this.handleGoToPage.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleOrderBy = this.handleOrderBy.bind(this);
  }

  componentDidMount() {
    this.getSearchData();
    this.getSearchDataPageCount();
  }

  getSearchData(
    searchTerm = "",
    offset = 0,
    orderBy = this.state.orderBy,
    orderDirection = this.state.orderDirection
  ) {
    this.setState({ loading: true }, function() {
      axios
        .get(
          `https://data.nasa.gov/resource/gh4g-9sfh.json?$query=select%20*%20where%20lower(name)%20like%20lower(%22%25${searchTerm}%25%22)%20order%20by%20${orderBy}%20${orderDirection}%20limit%20${this.state.resultsPerPage}%20offset%20${offset}`
        )
        .then(res => {
          const newData = res.data;
          this.setState({
            currentData: newData,
            loading: false
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    });
  }

  getSearchDataPageCount(searchTerm = "") {
    axios
      .get(
        `https://data.nasa.gov/resource/gh4g-9sfh.json?$select=count(name)%20where%20lower(name)%20like%20lower(%22%25${searchTerm}%25%22)`
      )
      .then(res => {
        const newPageCount = Math.ceil(
          res.data[0].count_name / this.state.resultsPerPage
        );
        this.setState({ pageCount: newPageCount });
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  handlePageChange(event) {
    const direction = event.target.name;
    if (direction === "next" && this.state.currentPage < this.state.pageCount) {
      const offset = this.state.currentPage * this.state.resultsPerPage;
      const nextPage = +this.state.currentPage + 1;
      this.setState({ currentPage: nextPage });
      this.getSearchData(this.state.currentSearchTerm, offset);
    } else if (direction === "previous" && this.state.currentPage > 1) {
      const offset = (this.state.currentPage - 2) * this.state.resultsPerPage;
      const previousPage = +this.state.currentPage - 1;
      this.setState({ currentPage: previousPage });
      this.getSearchData(this.state.currentSearchTerm, offset);
    }
    window.scrollTo(0, 0);
  }

  handleGoToPage(pageInput) {
    if (pageInput >= 1 && pageInput <= this.state.pageCount) {
      const offset = (pageInput - 1) * this.state.resultsPerPage;
      this.setState({ currentPage: +pageInput });
      this.getSearchData(this.state.currentSearchTerm, offset);
      this.setState({ toggleGoTo: "" });
    }
  }

  handleResultsSelect(event) {
    const resultsPerPage = event.target.value;
    if (this.state.currentData.length !== 0) {
      this.setState({ resultsPerPage }, function() {
        this.resetCurrentPage();
        this.getSearchData(this.state.currentSearchTerm);
        this.getSearchDataPageCount(this.state.currentSearchTerm);
      });
    }
  }

  resetCurrentPage() {
    this.setState({ currentPage: 1 });
  }

  handleSearch(searchTerm) {
    if (!searchTerm) {
      this.resetCurrentPage();
      this.setState({ currentSearchTerm: "" });
      this.getSearchData();
      this.getSearchDataPageCount();
    } else if (this.state.currentData) {
      const filteredSearchTerm = searchTerm.trim().replace(/#/gi, " ");
      this.resetCurrentPage();
      this.setState({ currentSearchTerm: filteredSearchTerm });
      this.getSearchData(filteredSearchTerm);
      this.getSearchDataPageCount(filteredSearchTerm);
    }
  }

  handleToggle(event) {
    const name = event.target.name;
    this.state.toggleGoTo !== name
      ? this.setState({ toggleGoTo: name })
      : this.setState({ toggleGoTo: "" });
  }

  handleClickOutside() {
    this.setState({ toggleGoTo: "" });
  }

  handleOrderBy(event) {
    const name = event.target[event.target.selectedIndex].getAttribute("name");
    const direction = event.target[event.target.selectedIndex].getAttribute(
      "direction"
    );
    const value = event.target[event.target.selectedIndex].value;
    if (this.state.currentData.length !== 0) {
      if (
        name !== this.state.orderBy ||
        direction !== this.state.orderDirection
      ) {
        this.setState(
          { orderBy: name, orderDirection: direction, sortByDisplay: value },
          function() {
            this.resetCurrentPage();
            this.getSearchData(
              this.state.currentSearchTerm,
              0,
              this.state.orderBy,
              this.state.orderDirection
            );
            this.getSearchDataPageCount(this.state.currentSearchTerm);
          }
        );
      }
    }
  }

  render() {
    return (
      <Fragment>
        <header className="header">
          {/* <h1 className="heading-1">Meteorite Explorer</h1> */}
          <h2 className="heading-2">Search NASA's Meteorite Landings API</h2>
          <Search handleSearch={this.handleSearch} />
        </header>
        <main className="container">
          <div className="options">
            <ResultsPerPageMenu
              resultsPerPage={this.state.resultsPerPage}
              handleResultsSelect={this.handleResultsSelect}
            />
            <SortByMenu
              sortByDisplay={this.state.sortByDisplay}
              handleOrderBy={this.handleOrderBy}
            />
            <div className="pagenav">
              {this.state.pageCount > 1 && !this.state.loading && (
                <div className="pageCounter--top">
                  <PageCounter
                    currentPage={this.state.currentPage}
                    pageCount={this.state.pageCount}
                    handlePageChange={this.handlePageChange}
                  />
                </div>
              )}
              <div className="goTo">
                <button
                  className="button"
                  name="toggleGoToTop"
                  onClick={this.handleToggle}
                >
                  Go to
                </button>
                {this.state.toggleGoTo === "toggleGoToTop" && (
                  <GoTo
                    handleGoToPage={this.handleGoToPage}
                    handleClickOutside={this.handleClickOutside}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="results">
            {this.state.currentData.length === 0 && !this.state.loading ? (
              <h1 className="noresults">No results found</h1>
            ) : (
              <ResultsTable displayData={this.state.currentData} />
            )}
          </div>
          {this.state.pageCount > 1 && !this.state.loading && (
            <div className="pageCounter--bottom">
              <PageCounter
                currentPage={this.state.currentPage}
                pageCount={this.state.pageCount}
                handlePageChange={this.handlePageChange}
              />
            </div>
          )}
        </main>
      </Fragment>
    );
  }
}

export default App;
