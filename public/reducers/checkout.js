export  function checkout(state=null,action){
	switch(action.type){
		case 'checkout':
		state = {data:action.payload};
		break;
	}
	return state;
}