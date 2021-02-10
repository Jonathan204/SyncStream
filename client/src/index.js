import React from 'react'
import ReactDOM from 'react-dom';

//redux dependencies
import { Provider } from 'react-redux'; //keeps track of the store which is the global state which allows us to access the store from anywhere within the app.
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,    
    document.getElementById('root')
);