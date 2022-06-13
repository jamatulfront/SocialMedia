import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../../helpers/clickOutside";
import { Return, Search } from "../../svg";
export default function SearchMenu({ color, setShowSearchMenu }) {
  const [showIcon, setShowIcon] = useState(false);
  const refSearchArea = useRef();
  const refInput = useRef();
  useClickOutside(refSearchArea, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {
    refInput.current.focus();
  }, []);
  return (
    <div ref={refSearchArea} className="header_left search_area scrollbar">
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => setShowSearchMenu(false)}
          >
            <Return color={color} />
          </div>
        </div>
        <div className="search" onClick={() => refInput.current.focus()}>
          {showIcon && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            ref={refInput}
            onFocus={() => setShowIcon(false)}
            onBlur={() => setShowIcon(true)}
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <Link to="/">Edit</Link>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
}
