import React from "react";
import {Card, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';


export const OfferCard = props => {

  const {id, title, location, imageUrl} = props.data;

  return <Col sm={6} md={4} lg={3} style={{marginBottom: 20}}>
            <Card style={{minHeight: 150}}>
              <Card.Img top width="100%" src={ imageUrl } alt="icon" />
              <Card.Body>

                <Card.Title style={{marginTop: 0}}>
                <h4><Link to={"/tickets/" + id + "/"}>{ title }</Link></h4>
                </Card.Title>
                <Card.Text>{ location }</Card.Text>
              </Card.Body>
            </Card>
          </Col>
};


OfferCard.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
};


export default OfferCard;