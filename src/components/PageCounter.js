import React, { Fragment } from "react";

function PageCounter({ currentPage, pageCount, handlePageChange }) {
  return (
    <Fragment>
      {`Page ${currentPage} of ${pageCount} `}
      <button className="button" name="previous" onClick={handlePageChange}>
        Previous
      </button>
      <button className="button" name="next" onClick={handlePageChange}>
        Next
      </button>
    </Fragment>
  );
}

export default PageCounter;
