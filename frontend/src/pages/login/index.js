import "./style.css";
import Footer from "../../components/login/Footer";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import { useState } from "react";

export default function Login() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setToggle={setToggle} />
        {toggle && <RegisterForm setToggle={setToggle} />}
        <Footer />
      </div>
    </div>
  );
}
