import { Formik, Form } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logininput from "../../components/inputs/logininput";
import Axios from "axios";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as YUP from "yup";

const loginInfos = {
  email: "",
  password: "",
};
export default function LoginForm({ setToggle }) {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = YUP.object({
    email: YUP.string()
      .required("Email address is required")
      .email("Must be an valid email"),
    password: YUP.string().required("Password is required"),
  });

  // ---------*** Form Submiting and Maintaining State's related to the Request ***----------
  /* States */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  /* Function for Submiting The for the Post Request*/
  const submitLoginForm = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      let { data } = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        login
      );

      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: data });
        Cookies.set("user", JSON.stringify(data));
        setLoading(false);

        navigateTo("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.msg);
    }
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
          >
            {(formik) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (login.email && login.password) {
                    submitLoginForm();
                  } else {
                    setError(
                      "Please provide your Email and Password to Login."
                    );
                  }
                }}
              >
                <Logininput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <Logininput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten password
          </Link>
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setToggle(true)}
          >
            Create Account
          </button>
          <ClipLoader loading={loading} size={40} color={"#1876f2"} />
          {error && <div className="reg_error">{error}</div>}
          {success && <div className="reg_success">{success}</div>}
        </div>
        <Link to="/">
          {" "}
          <b className="sign-extra">Create a Page</b> for a celebrity, brand or
          business
        </Link>
      </div>
    </div>
  );
}
