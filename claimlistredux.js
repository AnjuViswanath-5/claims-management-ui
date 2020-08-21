import{createStore} from 'redux';
import axios from 'axios';

const initialState = {
    claimList:[]
}

const reducer=(state,action)=>{
    switch(action.type){
        case "GET_CLAIMS":

            // axios.get(`http://localhost:7000/claims`)
            // .then(res => {
            //     state = res.data;
            //  })

            state=action.payload;
    }
    return state;
};

export const store=createStore(reducer,initialState);


