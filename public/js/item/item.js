import React,{Component} from 'react';
import './item.css';

export default class Item extends Component{
	constructor(props){
       super(props);
       this.state={messageClass:'item-added-message-hide',addToCart:'add-to-cart'}
	}
  addToCart(){
       this.setState({messageClass:'item-added-message'});
       this.setState({addToCart:'add-to-cart-selected'});
       setTimeout(()=>{
         this.setState({messageClass:'item-added-message-hide'});
         this.setState({addToCart:'add-to-cart'});
       },3000)
       this.props.selectedItem(this.props.obj);
  }
	render(){
		let obj = this.props.obj;
		return(
          <div className="item-div">
            <span className={this.state.messageClass}>Added to cart successfully.</span>
            {(obj.discount > 0) ? <span className="discount-msg">{obj.discount} % off</span> : ""}
            <img src={obj.img_url} className="item-img"/>
            <div className="item-list">
               <div className="item-name">{obj.name}</div>
               {(obj.discount > 0) ? <span><span className="item-price"><strike className="strike-color">${obj.price}</strike></span><span className="updated-price">${obj.price - obj.price*(obj.discount/100)}</span></span> : <span className="item-price">${obj.price}</span>}
               <span className={this.state.addToCart} onClick={this.addToCart.bind(this)}>Add to cart</span>
            </div>
            
          </div>
		)
	}
}