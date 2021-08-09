import React from "react";
import { Link } from "react-router-dom";
import AddProductModal from "./AddProductModal";

function AppBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/">
                  <button type="button" className="btn btn-light">
                    Home
                  </button>
                </Link>
              </li>
              <li className="nav-item" style={{ marginLeft: "1130px" }}>
                <AddProductModal></AddProductModal>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AppBar;
