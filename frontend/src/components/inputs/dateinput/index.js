import React from "react";
import "./style.css";
import { useMediaQuery } from "react-responsive";
export default function DateInput({
  availableDays,
  availableMonths,
  availableYears,
  handleRegisterInput,
  bDay,
  bMonth,
  bYear,
  error,
}) {
  const view1 = useMediaQuery({
    query: "(min-width:539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width:850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width:1170px)",
  });
  return (
    <div className="reg_col">
      <div className="reg_line_header">
        Date of birth <i className="info_icon"></i>
      </div>
      <div
        className="reg_grid"
        style={{ marginBottom: `${error ? "20px" : ""}` }}
      >
        <select name="bDay" onChange={handleRegisterInput}>
          {availableDays.map((day, index) => {
            return (
              <option key={index} value={day}>
                {day}
              </option>
            );
          })}
        </select>
        <select name="bMonth" onChange={handleRegisterInput}>
          {availableMonths.map((month, index) => {
            return (
              <option key={index} value={month}>
                {month}
              </option>
            );
          })}
        </select>
        <select name="bYear" onChange={handleRegisterInput}>
          {availableYears.map((year, index) => {
            return (
              <option key={index} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
      {error && (
        <div className="input_error date_input_error">
          {error}{" "}
          <i
            className="error_arrow_bottom"
            style={{
              top: "73px",
              left: "45%",
            }}
          ></i>
        </div>
      )}
    </div>
  );
}
