import * as types from '../constants/data';


const initialValue = {
    allAgents: []
};



const fetchReducer = (state=initialValue, action) => {
    switch (action.type) {
        case types.UPDATE_DATA_STATE: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: return  state;
    }
};



export default fetchReducer;