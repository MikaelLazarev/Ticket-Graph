import React from "react";
import {Nav, NavDropdown, Form, Button, Navbar, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./AppBar.css"


const AppBar = (props) => {

    return (
        <Container fluid style={{backgroundColor: "#F0F0FF", paddingLeft: 20, paddingRight:40}}>
            <Navbar style={{textColor: "#000000", paddingLeft: 20, paddingRight:40, }}>
                <Navbar.Brand href="/"><strong>Ticket Graph</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link style={{marginLeft: 20}}/>
                </Nav>
                <Nav variant={"right"} >
                    <Nav.Item bsPrefix={'nav-link'}><Link to={"/"}>Tickets</Link></Nav.Item>
                    <Nav.Item bsPrefix={'nav-link'}><Link to={"/tickets/new"}>Add your event</Link></Nav.Item>
                </Nav>

              </Navbar.Collapse>

            </Navbar>
        </Container>
            )

}


export default AppBar;
