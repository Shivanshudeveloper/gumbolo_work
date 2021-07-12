import React, { Component } from "react";
//import logo from "../../logo.svg";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class Navbar extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    links: [
      {
        navigation: "/",
        name: "Home",
      },
      {
        navigation: "/invoices",
        name: "Invoices",
      },
      {
        navigation: "/settings",
        name: "Settings",
      },
    ],
  };

  getNavLinkClass = (path) => {
    return this.props.location.pathname === path
      ? "nav-item active"
      : "nav-item";
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <img style={{ width: '48px', marginRight: '10px' }} alt="Logo" src="https://res.cloudinary.com/dx9dnqzaj/image/upload/v1626061329/petshop/Gumbolo_logo_k420av.png" />
          {/* <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="utility-app"
          /> */}
          Gumbolo Invoice Generator
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {this.state.links.map((item) => (
              <li
                key={item.name}
                className={this.getNavLinkClass(item.navigation)}
              >
                <Link className="nav-link" to={item.navigation}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
