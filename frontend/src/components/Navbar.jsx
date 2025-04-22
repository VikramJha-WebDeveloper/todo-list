import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";


const NavSection = styled.div`
  .dropdown-menu[data-bs-popper]{
    right: 0;
    left: auto;
    width: 150px;
  }
  .logout{
   cursor: pointer;
  }
  
  @media screen and (max-width: 992px){
    .dropdown-menu[data-bs-popper]{
    left: 0;
  }
  }
`;

const Navbar = ({ colors }) => {
  const [userFullName, setUserFullName] = useState("");
  const baseUrl =  import.meta.env.VITE_API_URL;
  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(`${baseUrl}/me`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
      setUserFullName(result.userFullName);
    };
    getUserData();
  }, []);
  const logoutUser = async() => {
    const response = await fetch(`${baseUrl}/logout`, {
      method: "POST",
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);
    window.location.reload();
  }
  return (
    <NavSection>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            TodoList
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/todo">
                  Todo
                </NavLink>
              </li>
            </ul>
            <div>
              {userFullName ? (
                <>
                  <div class="dropdown">
  <button class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {userFullName}
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item logout" onClick={logoutUser}>Logout</a></li>
  </ul>
</div>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-dark me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </NavSection>
  );
};

export default Navbar;
