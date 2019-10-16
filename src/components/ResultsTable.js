import React from "react";

function ResultsTable({ displayData }) {
  return (
    <table>
      <thead>
        <tr>
          <th name="name">Name</th>
          <th name="id">Id</th>
          <th name="nametype">Name Type</th>
          <th name="recclass">Rec Class</th>
          <th name="mass">Mass (g)</th>
          <th name="fall">Fall</th>
          <th name="year">Date</th>
          <th name="reclat">Latitude</th>
          <th name="reclong">Longitude</th>
        </tr>
      </thead>
      <tbody>
        {displayData.length > 0 &&
          displayData.map(el => {
            return (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.id}</td>
                <td>{el.nametype}</td>
                <td>{el.recclass}</td>
                <td>{el.mass}</td>
                <td>{el.fall}</td>
                <td>{new Date(el.year).toDateString()}</td>
                <td>{el.reclat}</td>
                <td>{el.reclong}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default ResultsTable;
