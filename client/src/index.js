import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider} from 'react-apollo'

import App from './containers/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
	throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
  }
  
  const client = new ApolloClient({
	uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
	cache: new InMemoryCache(),
  });

ReactDOM.render((
	<ApolloProvider client={client}>
	      	<BrowserRouter>
	        		<App />
			</BrowserRouter>
	</ApolloProvider>

  ), document.getElementById('root'));
