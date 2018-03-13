import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import ShoppingList from './shoppingCart/shoppingCart.js';
import Checkout from './checkout/checkout';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import '../app.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
ReactDOM.render( 
    <Provider store={createStoreWithMiddleware(rootReducer)}>
	    <BrowserRouter>
	      <div className="main-container">
	       <Switch>
	         <Route path="/checkout" component={Checkout}/>
	         <Route path="/" component={ShoppingList} />
	       </Switch>
	      </div>
	    </BrowserRouter>
    </Provider>,document.getElementById('app'));    