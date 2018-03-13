import axios from 'axios';
export function getShoppingData(callback){
   return function(dispatch){
   	 axios.get("https://api.myjson.com/bins/qhnfp").then(function(res){
   	 	callback(res.data);
   	 }).catch(function(err){

   	 })
   }
}
export function checkoutItems(data){
	return({
		type:'checkout',
		payload:data
	})
}