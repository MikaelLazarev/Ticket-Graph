import React from "react";
import {Tab, Button} from "react-bootstrap";

import PageHeader from "../../components/PageHeader";
import TabBar from "../../components/TabBar/TabBar";
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import TicketSaleContract from "../../contracts/TicketSale.json";
import getWeb3 from "../../utils/getWeb3";
import {dateConverter, numberWithCommas} from '../../utils/formaters';

const GRAPH_QUERY_DETAIL = gql`
  query ticketEvent($id: ID!) {
    ticketEvent(id: $id) {
      id
      owner
      title
      location
      date
      imageUrl
      price
      qty
    }
  }
`

const GRAPH_QUERY_PARTICIPANTS = gql`
  query tickets($where: Ticket_filter!) {
    tickets(where: $where) {
      buyer
    }
  }
`

class DetailView extends React.Component {
  
  state = { web3: null, accounts: null, contract: null };

  componentDidMount = async () => {        
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TicketSaleContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TicketSaleContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      console.log("setState");
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  buyTicket = (id, price) => {
    const { contract } = this.state;

    contract.methods.buyTicket(id).send({from: this.state.accounts[0], value: price})
        .on('transactionHash', (hash) => {
            alert("Your transaction was submitted in network and will appear in advertisement list soon. Your could check it's hash " + hash);
            this.props.history.push("/");
        })
  }

  render() {
    const { props } = this;

    const { history } = props;
    const { id, tab }  = props.match.params;

    const pageRender = ({title, location, date, price, imageUrl, qty}) => {
    
    const dateStr = dateConverter(date);
    console.log(dateStr);

    return (<>
      <PageHeader
          header={ title }
          title = { title }
          icon = { imageUrl }
          subHeader={ location }
      />

      <TabBar id={id} resource={"tickets"} tab={tab} history={history}>

        <Tab.Pane eventKey="info" label={"Info"}>
            Date: { dateStr.toString() } <br />
            Location: {location} <br />
            Price: { numberWithCommas(price) } <br />
            Tickets Left: { qty } <br /><br />
            <Button onClick={() => this.buyTicket(id, price)}>Buy!</Button>
            
            
        </Tab.Pane>
        <Tab.Pane eventKey="participants" label={"Participants"}>
          <Query
            query={GRAPH_QUERY_PARTICIPANTS}
            variables={{where: {event_id: parseInt(id.toString().replace("0x", ""))}}}
            >
            {({ data, error, loading }) => {
              return loading ? "Loading" : error ? "Error" + error : data.tickets.map(ticket => <p>{ticket.buyer}</p>)
            }}
          </Query>

        </Tab.Pane>

      </TabBar>
    </>)
    }

    return (
        <Query
            query={GRAPH_QUERY_DETAIL}
            variables={{id: id}}
        >
            {({ data, error, loading }) => {
            return loading ? "Loading" : error ? "Error" + error : pageRender(data.ticketEvent)
            
            }}
        </Query>
    );
  }
}

export default DetailView;