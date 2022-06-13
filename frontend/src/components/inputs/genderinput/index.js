import React from "react";

export default function GenderInput({ handleRegisterInput, error }) {
  return (
    <div className="reg_col">
      <div className="reg_line_header">
        Gender <i className="info_icon"></i>
      </div>
      <div
        className="reg_grid"
        style={{ marginBottom: `${error ? "20px" : "0px"}` }}
      >
        <label htmlFor="male">
          Male
          <input
            type={"radio"}
            name="gender"
            value={"male"}
            id="male"
            onChange={handleRegisterInput}
          />
        </label>
        <label htmlFor="female">
          Female
          <input
            type={"radio"}
            name="gender"
            value={"female"}
            id="female"
            onChange={handleRegisterInput}
          />
        </label>
        <label htmlFor="custom">
          Custom
          <input
            type={"radio"}
            name="gender"
            value={"custom"}
            id="custom"
            onChange={handleRegisterInput}
          />
        </label>
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
