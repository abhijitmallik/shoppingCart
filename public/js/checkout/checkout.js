import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import './checkout.css';
let sum = 0;
let totalItems = 0;
class Checkout extends Component{
	constructor(props){
       super(props);
       this.deleteItem = this.deleteItem.bind(this);
       this.state = {data:this.props.cartData,redirectToHome:false};
	}
	deleteItem(id){
        let obj = this.state.data;
        sum = 0;
        totalItems = 0;
        debugger;
        delete obj[id];
        localStorage.setItem('cartdata', obj);
        if(Object.keys(obj).length == 0){
        	this.setState({redirectToHome:true});
        }
        this.setState({data:obj});
	}
	itemList(obj){
		let price = (obj.object.discount > 0) ? obj.count * (obj.object.price - obj.object.price * obj.object.discount/100) : (obj.count * obj.object.price);
		sum = sum + price;
		totalItems = totalItems + 1;
		return(
		  <div className="row-wrapper">
		    <div className="items-list-div">	
	          <div className="row-data">
	            <img src={obj.object.img_url} className="item-img"/>
	            <span className="item-name">{obj.object.name}</span>
	            <span className="item-delete" title="delete item" onClick={()=>{this.deleteItem(obj.object.id)}}>X</span>
	          </div>
	          <span className="dash-class"> - </span>
	          <div className="quatity-div">
	            <span className="quatity-span">{obj.count}</span>
	          </div>
	        </div>  
	        <div className="total-items">
	           <span className="plus-class"> + </span>
	           <span className="price-items">${price}</span>
	        </div>
          </div>
		)
	}
	render(){
		let checkOutObj = this.state.data;
		let itemsObj = checkOutObj.map((obj)=>{
			return this.itemList(obj);
		})
		if(this.state.redirectToHome){
			return <Redirect to="/"/>
		}
		return(
           <div className="summary-display"> 
            <div className="order-summary">Order Summary</div>
            <div className="header-summary"><span className="total-items-header">items ({totalItems})</span><span className="quantity-header">Qty</span><span className="quatity-price">Price</span></div>
              <div className="item-display">
                {itemsObj}
              </div>
              <div className="account-summary">
                <div className="header">Total</div>
                <span className="item-number">Items{totalItems}</span><span className="total-amount">$({sum})</span>
                <div className="footer-bill"><span className="order-total">Order total</span><span className="final-bill">${sum}</span></div>
              </div>
           </div>
		)
	}
}
function mapPropesToState(state){
	return {cartData:state.checkout.data}
}
export default connect(mapPropesToState)(Checkout);