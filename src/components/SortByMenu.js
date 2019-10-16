import React, { Fragment } from "react";

function SortByMenu({ sortByDisplay, handleOrderBy }) {
  return (
    <div className="options__sortBy">
      Sort by{" "}
      <select
        className="options__sortBy__select"
        value={sortByDisplay}
        onChange={handleOrderBy}
      >
        <option name="name" direction="asc">
          Name (ascending)
        </option>
        <option name="name" direction="desc">
          Name (descending)
        </option>
        <option name="id" direction="asc">
          Id (ascending)
        </option>
        <option name="id" direction="desc">
          Id (descending)
        </option>
        <option name="nametype" direction="asc">
          Name Type (ascending)
        </option>
        <option name="nametype" direction="desc">
          Name Type (descending)
        </option>
        <option name="recclass" direction="asc">
          Rec Class (ascending)
        </option>
        <option name="recclass" direction="desc">
          Rec Class (descending)
        </option>
        <option name="mass" direction="asc">
          Mass (ascending)
        </option>
        <option name="mass" direction="desc">
          Mass (descending)
        </option>
        <option name="fall" direction="asc">
          Fall (ascending)
        </option>
        <option name="fall" direction="desc">
          Fall (descending)
        </option>
        <option name="year" direction="asc">
          Date (ascending)
        </option>
        <option name="year" direction="desc">
          Date (descending)
        </option>
      </select>
    </div>
  );
}

export default SortByMenu;
