import React from "react";
import {Container, Col, Row} from "react-bootstrap"
import './Footer.css'

const footer = ( props ) => (
        <footer className="footer navbar-fixed-bottom">
            <Container fluid>
                <Row>
                    <Col sm={6}>
                         2019 © Mikhail Lazarev, All rights reserved
                    </Col>
                    <Col sm={6}>
                         <a href="http://t.me/mikael_l" target="_blank" rel="noopener noreferrer">Contact</a>
                    </Col>
                </Row>

            </Container>
        </footer>);


export default footer;
