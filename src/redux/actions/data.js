import * as types from "../constants/data";
import {createAction} from "../../utils/createAction";



export const getAllAgents = createAction(types.GET_AGENTS);
export const postNewAgents = createAction(types.POST_NEW_AGENTS);
export const deleteAgents = createAction(types.DELETE_AGENTS);
export const editAgents = createAction(types.EDIT_AGENTS);
export const getAllUsers= createAction(types.GET_USER);
export const deleteOneUser= createAction(types.DELETE_USER);
export const editUser= createAction(types.EDIT_USER);
export const postNewUser= createAction(types.POST_NEW_USER);
export const getKeywords= createAction(types.GET_KEYWORDS);
export const postNewKeywords= createAction(types.POST_NEW_KEYWORDS);
export const deleteKeywords= createAction(types.DELETE_KEYWORDS);
export const editKeywords= createAction(types.EDIT_KEYWORDS);
export const getDomains= createAction(types.GET_DOMAINS);
export const postNewDomains= createAction(types.POST_NEW_DOMAINS);
export const editDomains= createAction(types.EDIT_DOMAINS);
export const deleteDomains= createAction(types.DELETE_DOMAINS);
export const getScans= createAction(types.GET_SCANS);
export const postNewScans= createAction(types.POST_NEW_SCANS);
export const deleteScans= createAction(types.DELETE_SCANS);
export const editScans= createAction(types.EDIT_SCANS);


export const updateDataState = createAction(types.UPDATE_DATA_STATE);