import React, { Component } from "react";
import { Container, Row} from "react-bootstrap";
import PageHeader from "../../components/PageHeader";
import OfferCard from "./OfferCard"
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const GRAPH_QUERY = gql`
  query tickets($where: TicketEvent_filter!, $orderBy: TicketEvent_orderBy) {
    ticketEvents(first: 100, where: $where, orderBy: $orderBy, orderDirection: asc) {
      id
      owner
      title
      location
      imageUrl
    }
  }
`

const ListView = props =>  {

  return (
      <div>
      <PageHeader
          header = "Events"
          subHeader = "Find your event!"
          searchBar
      />
      <Container fluid style={{paddingLeft: 40, paddingRight: 40, paddingTop: 20}}>
        <Row>
            <Query query={GRAPH_QUERY} variables={{ where: {}, }} >
              {({ data, error, loading }) => {
                return loading ? "Loading" : error ? "Error" + error : 
                    data.ticketEvents.map(adv => <OfferCard data={adv} key={adv.id} />)
              }}
          </Query>
        </Row>

      </Container>

      </div>
  );
};

export default ListView;