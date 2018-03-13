import React,{Component} from 'react';
import './shoppingCart.css';
import {getShoppingData,checkoutItems} from '../../actions/getShoppingItems';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Item from '../item/item';
import { Redirect } from 'react-router-dom';

let cartBucket = [];
class ShoppingList extends Component{
	constructor(props){
		super(props);
		this.state = {"shoppingData":"","isCheckout":false,"enableMask":true};
	}
	componentDidMount(){
       this.props.getShoppingData((data)=>{
             this.setState({shoppingData:data});
       });
       let shoppingCart = localStorage.getItem('cartdata');
	}
	addItemsToCart(obj){
		if(cartBucket[obj.id]){
            cartBucket[obj.id].count = cartBucket[obj.id].count + 1;
		}else{
			cartBucket[obj.id] = {object:obj,count:1};
		}
		localStorage.setItem('cartdata',JSON.stringify(cartBucket));
		this.setState({enableMask:false});
	}
	iterateEachItem(obj){
       return <Item obj={obj} key={obj.id} selectedItem={this.addItemsToCart.bind(this)}/>
	}
	checkout(){
	   this.props.checkoutItems(cartBucket);
       this.setState({isCheckout:true});
	}
	render(){
		let obj = "";
		if(this.state.shoppingData){
             obj = this.state.shoppingData.map((obj)=>{
                return this.iterateEachItem(obj);
             });
			
		}else{
			obj = "";
		}
		if(this.state.isCheckout){
			return <Redirect to="/checkout"/>
		}else{
			return(
	          <div>
	            <div className="header">
	               <div className="all-items">All Items</div>{this.state.enableMask ? <div className="mask"></div> : ""}<div className='add-to-cart' onClick={this.checkout.bind(this)}>Go to Cart</div>
	            </div>
	            {obj}
	          </div>
			)
		}
		
	}
}

function bindActionWithClass(dispatch){
   return bindActionCreators(Object.assign({getShoppingData,checkoutItems}),dispatch);
}

export default connect(null,bindActionWithClass)(ShoppingList);