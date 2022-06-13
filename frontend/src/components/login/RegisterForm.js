import React, { useState } from "react";
import * as YUP from "yup";
import { Form, Formik } from "formik";
import RegisterInput from "../inputs/registerinput";
import DateInput from "../inputs/dateinput";
import GenderInput from "../inputs/genderinput";
import Axios from "axios";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function RegisterForm({ setToggle }) {
  const initialUser = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDay(),
    gender: "",
  };
  let tempYear = new Date().getFullYear();
  const [user, setUser] = useState(initialUser);
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const handleRegisterInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //------- *** Seting requiring days,months and years for input ***-----
  let availableYears = Array.from(
    new Array(120),
    (val, index) => tempYear - index
  );
  let availableMonths = Array.from(new Array(12), (val, index) => index + 1);
  let availableDays = Array.from(
    new Array(new Date(bYear, bMonth, 0).getDate()),
    (val, index) => index + 1
  );

  //-------- *** Schema for Form Validation ***-------

  let registerValidation = YUP.object({
    first_name: YUP.string()
      .required("What's your First name ?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    last_name: YUP.string()
      .required("What's your Last name ?")
      .min(2, "Last name must be between 2 and 16 characters.")
      .max(16, "Last name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    email: YUP.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: YUP.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more that 36 characters."),
  });

  // ---------*** Form Submiting and Maintaining State's related to the Request ***----------
  /* States */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  /* Function for Submiting The for the Post Request*/
  const submitRegisterForm = async () => {
    try {
      setLoading(true);
      let { data } = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        user
      );

      const { message, ...userInfo } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: userInfo });
        Cookies.set("user", JSON.stringify(user));
        setLoading(false);
        setError("");
        navigateTo("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.msg);
    }
  };
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i onClick={() => setToggle(false)} className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <div className="register_form">
          <Formik
            initialValues={{
              first_name,
              last_name,
              email,
              password,
              bDay,
              bMonth,
              bYear,
              gender,
            }}
            enableReinitialize
            validationSchema={registerValidation}
          >
            {(formik) => (
              <Form
                className="register_form_wrap"
                onSubmit={(e) => {
                  e.preventDefault();
                  let currentDate = new Date();
                  let userDate = new Date(bYear, bMonth - 1, bDay);
                  let moreThan14 = new Date(1970 + 14, 0, 1);
                  let moreThan70 = new Date(1970 + 70, 0, 1);
                  let diffOfDate = currentDate - userDate;
                  if (diffOfDate < moreThan14) {
                    setDateError(
                      "It's look like you enter wrong info. Age less then 14 are not allowed. Please provide an valid date."
                    );
                  } else if (diffOfDate > moreThan70) {
                    setDateError(
                      "It's look like you enter wrong info. Age more then 70 are not allowed. Please provide an valid date."
                    );
                  } else if (!gender) {
                    setDateError("");
                    setGenderError(
                      "Please provide Your gender. Later you can change your setting who to see."
                    );
                  } else {
                    setDateError("");
                    setGenderError("");
                    submitRegisterForm();
                  }
                }}
              >
                <div className="reg_line">
                  <RegisterInput
                    type="text"
                    name="first_name"
                    placeholder={"First name"}
                    onChange={handleRegisterInput}
                  />
                  <RegisterInput
                    type="text"
                    name="last_name"
                    placeholder={"Surname"}
                    onChange={handleRegisterInput}
                  />
                </div>
                <div className="reg_line">
                  <RegisterInput
                    type="email"
                    name="email"
                    placeholder={"Mobile Number or Email Address"}
                    onChange={handleRegisterInput}
                  />
                </div>
                <div className="reg_line">
                  <RegisterInput
                    type="password"
                    name="password"
                    placeholder={"New Password"}
                    onChange={handleRegisterInput}
                  />
                </div>
                <DateInput
                  availableDays={availableDays}
                  availableMonths={availableMonths}
                  availableYears={availableYears}
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  handleRegisterInput={handleRegisterInput}
                  error={dateError}
                />
                <GenderInput
                  error={genderError}
                  handleRegisterInput={handleRegisterInput}
                />
                <div className="reg_infos">
                  By clicking Sign up, you agree to our{" "}
                  <span>Terms, Data Policy &nbsp;</span>
                  and <span>Cookie Policy.</span> You may receive SMS
                  notifications from us and can otp out at any time.
                </div>
                <div className="reg_btn_wrapper">
                  <button type="submit" className="blue_btn open_signup">
                    Sign Up
                  </button>
                </div>
                <ClipLoader loading={loading} size={40} color={"#1876f2"} />
                {error && <div className="reg_error">{error}</div>}
                {success && <div className="reg_success">{success}</div>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
