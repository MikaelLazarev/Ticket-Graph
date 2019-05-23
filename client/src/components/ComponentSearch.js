import React, {Component} from "react";
import {Form} from "react-bootstrap";


class ComponentSearch extends Component {

    onChange = (event) => {
        event.preventDefault()
        const value = event.target.value.toLowerCase();
        console.log("Component Search" + value)
        this.props.searchComponent(this.props.resource, value);
    }

    render() {
        return (
            <Form.Group>
                <Form.Control
                    name = {"search"}
                    value={""}
                    onChange = {event => this.onChange(event)}
                  />
            </Form.Group>
            );
    }
}


export default ComponentSearch;