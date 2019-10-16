import React, { Fragment } from "react";

function ResultsPerPageMenu({ resultsPerPage, handleResultsSelect }) {
  return (
    <Fragment>
      Results per page{" "}
      <select
        className="options__resultsPerPage"
        value={resultsPerPage}
        onChange={handleResultsSelect}
      >
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
        <option>500</option>
        <option>1000</option>
      </select>{" "}
    </Fragment>
  );
}

export default ResultsPerPageMenu;
