import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/reducer/authSlice";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {!auth.isLogged && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {auth.isLogged && (
          <>
            <Link to="/create">New Post</Link>
            <Link
              to="/"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
