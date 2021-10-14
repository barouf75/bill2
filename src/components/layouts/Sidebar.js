import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import iconSun from "../../assets/images/icon-sun.svg";
import ProfileModal from "../utils/ProfileModal";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import decode from "jwt-decode";

const Sidebar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <aside className="sticky top-0 row-start-1 row-end-2 col-start-1 col-end-2 h-screen bg-primaryOne rounded-r-3xl flex flex-col justify-between z-20">
      <Link
        to="/"
        className="bg-logo-primary h-24 flex justify-center items-center flex-col relative rounded-r-3xl"
      >
        <img className="z-10 w-9" src={logo} alt="logo" />
        <div className="bg-logo-secondary h-12 w-24 absolute bottom-0 left-0 rounded-tl-3xl rounded-br-3xl"></div>
      </Link>
      <div className="flex flex-col items-center justify-evenly h-36">
        <img src={iconSun} alt="theme" />
        <div className="w-full h-px bg-sidebar-border"></div>
        {user ? (
          <ProfileModal logout={logout} user={user} />
        ) : (
          <button
            onClick={() => {
              history.push("/auth");
            }}
            className="text-2xl px-2 py-1 text-white"
          >
            <i className="fas fa-sign-in-alt"></i>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;