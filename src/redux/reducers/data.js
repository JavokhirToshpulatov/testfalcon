import * as types from '../constants/data';


const initialValue = {
    allAgents: {},
    singleAgents:{},
    scanAgents:{},
    scanHtmlCurrent:"",
    scanHtmlPrevious:"",
    scanWebHistories:{},
    scanKeywords:{},
    historyOne:{},
    historyResult:{},
    histories:{},
    allScans:{},
    singleScan:{},
    singleDomain:{},
    singleKeyword:{},
    keywords:{},
    domains:{},
    domainScans:{},
    users:{},
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