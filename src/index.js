import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'normalize.css/normalize.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import client from './connection';

import { ApolloProvider } from '@apollo/react-hooks';
ReactDOM.render(
  <React.StrictMode>
     <ApolloProvider client={client}>
       <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
