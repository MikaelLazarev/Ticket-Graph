import React from "react";
import {Nav, Container, Tab} from "react-bootstrap";


function TabBar(props) {

    const children = props.children;
    const navItems =  React.Children.map(children, child =>
        (<Nav.Item><Nav.Link eventKey={child.props.eventKey}>{child.props.label}</Nav.Link></Nav.Item>))

    return (
        <Tab.Container
            activeKey={props.tab || "info"}
            onSelect={key => props.history.push("/" + props.resource + "/" + props.id + "/" + key)}
        >
            <Container fluid style={{backgroundColor: "#FAFBFC", paddingLeft: 40, paddingRight: 40}}>
                <Nav variant="tabs">
                    {navItems}
                </Nav>
            </Container>

            <Container fluid style={{paddingLeft: 40, paddingRight: 40}}>

                <Tab.Content style={{marginTop: 15}}>
                    {props.children}
                </Tab.Content>

            </Container>
        </Tab.Container>
    )
}

export default TabBar;