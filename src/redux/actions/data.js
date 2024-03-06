import * as types from "../constants/data";
import {createAction} from "../../utils/createAction";



export const getAllAgents = createAction(types.GET_AGENTS);
export const postNewAgents = createAction(types.POST_NEW_AGENTS);


export const updateDataState = createAction(types.UPDATE_DATA_STATE);