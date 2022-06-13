import "./style.css";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Search,
  Watch,
  Messenger,
  Notifications,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./searchMenu";
import { useRef, useState } from "react";
import AllMenu from "./allMenu";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu";

export default function Header() {
  const color = "#65676b";
  const { user } = useSelector((user) => ({ ...user }));

  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const refAllMenu = useRef();
  useClickOutside(refAllMenu, () => {
    setShowAllMenu(false);
  });
  const refUserMenu = useRef();
  useClickOutside(refUserMenu, () => {
    setShowUserMenu(false);
  });
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSearchMenu(true)}>
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu setShowSearchMenu={setShowSearchMenu} color={color} />
      )}
      <div className="header_middle">
        <Link to={"/"} className="middle_icon active">
          <HomeActive />
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">7+</div>
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link to={"/profile"} className="profile_link">
          <img src={user?.picture} alt="" />
          <span>{user?.first_name} jamatul</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && "header-active"}`}
          ref={refAllMenu}
        >
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <Menu />
          </div>

          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div
          ref={refUserMenu}
          className={`circle_icon hover1 ${showUserMenu && "header-active"}`}
        >
          <div onClick={() => setShowUserMenu((prev) => !prev)}>
            <ArrowDown />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
