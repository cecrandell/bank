import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.css";

class Header extends Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#002a4d" }}
        s
      >
        <Container>
          <Navbar.Brand href="/">Internet Banking Application</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="#deets">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
  }
}

export default Header;
