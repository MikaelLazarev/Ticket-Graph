import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import AppBar from '../components/AppBar/AppBar'
import Footer from '../components/Footer'

import TicketsListView from "./Tickets/ListView"
import TicketsDetailView from "./Tickets/DetailView"
import TicketsFormView from "./Tickets/FormView";


export class App extends Component {

  render() {
    console.log("APP", this.props);
    return <>

            <AppBar />
            <div style={{marginBottom: 100, minHeight: 500}}>
              <Switch>

                  <Route exact path="/" component={ TicketsListView } />
                  <Route exact path="/tickets/new" component={ TicketsFormView } />
                  <Route exact path="/tickets/:id/:tab" component={ TicketsDetailView } />
                  <Route exact path="/tickets/:id" component={ TicketsDetailView } />

                  <Route path='*' component={ TicketsListView }/>
              </Switch>
            </div>
            <Footer {...this.props}/>
        </>
  }
}


export default withRouter(App);
