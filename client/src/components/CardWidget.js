import React from "react";
import {Card} from "react-bootstrap"


export const CardWidget = (props ) => (

    <Card style={{backgroundColor: "#FAFBFC", minHeight: props.minHeight}}>

        <Card.Body>
            <Card.Title>
            <table width="100%">
                <tbody>
                <tr valign="center">
                    <td>
                        <h5 style={{margin: "0 0 0 0"}}>{props.title}</h5>
                    </td>
                    <td align="right">
                        {props.rightToolbar}
                    </td>
                </tr>
                </tbody>
            </table>
        </Card.Title>
            {props.children}
        </Card.Body>

    </Card>);

export default CardWidget;