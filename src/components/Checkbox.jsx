import React from "react";
import Checkbox from "@mui/material/Checkbox";

const CheckboxComponent = ({ data, title, filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters((prev) => {
      if (e.target.checked) {
        if (!prev.includes(e.target.value)) {
          return [...prev, e.target.value];
        }
        return [...prev]

      } else if (!e.target.checked) {
        prev.splice(prev.indexOf(e.target.value), 1)
        return [...prev];
      }
    });
  };

  return (
    <>
      <h1 className="type-title">{title}</h1>
      {data.map((account) => {
        return (
          <div className="checkbox-margin">
            <Checkbox value={account} onChange={handleChange} checked={filters.includes(account)}/>
            <p className="para-margin">{account}</p>
          </div>
        );
      })}
    </>
  );
};

export default CheckboxComponent;
