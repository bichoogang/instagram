import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
const store = createStore(reducers, compose(applyMiddleware(thunk)))
// , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
    ,
  document.getElementById('root')
);


