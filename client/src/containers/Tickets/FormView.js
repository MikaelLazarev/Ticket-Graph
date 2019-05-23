import React, { Component } from "react";
import { Container } from "react-bootstrap";
import * as Yup from 'yup';

import PageHeader from "../../components/PageHeader";
//import DetailDataLoaderWrapper from "../../components/DataLoaders/DataLoaderDetail";
import FormikForm from "../../components/Forms/FormikForm";
//import {api, resource} from "./_config";
import TicketSaleContract from "../../contracts/TicketSale.json";
import getWeb3 from "../../utils/getWeb3";


class FormView extends Component {
    
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

  onSubmit = ({title, location, imageURL, price, date, qty}) => {
      console.log("HELLO on Sumbit");
      const { contract } = this.state;
      var timestamp = new Date(date).getTime() / 1000;
      console.log(timestamp);

      contract.methods.postEvent(title, location, timestamp, imageURL, price, qty).send({from: this.state.accounts[0]})
          .on('transactionHash', (hash) => {
              alert("Your transaction was submitted in network and will appear in advertisement list soon. Your could check it's hash " + hash);
              this.props.history.push("/");

          })
      
  }

  render() {

    if (!this.state.web3) { return "Loading"}

      const fieldsList = {
        title: {
              title: 'Title',
              sm: 12,
              validation: Yup.string().required('Required')
        },

        location: {
          title: 'Location',
          sm: 12,
          validation: Yup.string().required('Required')
        },

        date: {
          title: 'Date',
          sm: 12,
          validation: Yup.date().required('Required')
        },
        
        imageURL: {
              title: 'Image Url',
              sm: 12,
              validation: Yup.string().url().required('Required')
        },

        price: {
            title: 'Price',
            sm: 12,
            validation: Yup.number().required('Required')
        },

        qty: {
          title: 'Quantity',
          sm: 12,
          validation: Yup.number().required('Required')
        },
      };


      return <>
              <PageHeader
                  header = { `Create a new advertisement` }
                  subHeader =  { '' }
              />
              <Container fluid style={{ paddingLeft: 40, paddingRight: 40}}>
                  <FormikForm fieldList = {fieldsList}
                              onSubmit = {this.onSubmit}
                              {...this.props}
                    />
              </Container>
            </>

  }

};


export default FormView;