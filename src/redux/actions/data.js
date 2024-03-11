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
export const getSingleAgents= createAction(types.GET_SINGLE_AGENT);
export const getSingleScan= createAction(types.GET_SINGLE_SCAN);
export const getSingleDomain= createAction(types.GET_SINGLE_DOMAIN);
export const getSingleKeyword= createAction(types.GET_SINGLE_KEYWORD);
export const getScansAgent= createAction(types.GET_SCANS_AGENTS)
export const getScansDomains= createAction(types.GET_SCANS_DOMAINS)
export const getScansKeywords= createAction(types.GET_SCANS_KEYWORDS)
export const getScansHistories= createAction(types.GET_SCANS_HISTORIES)
export const getScansHistoriesResult= createAction(types.GET_SCANS_HISTORIES_RESULTS)
export const getOneScansHistories= createAction(types.GET_ONE_SCANS_HISTORIES)
export const getDomainScans= createAction(types.GET_DOMAIN_SCANS)
export const getDomainHistories= createAction(types.GET_DOMAIN_HISTORIES)
export const getKeywordsScan= createAction(types.GET_KEYWORD_SCAN)
export const getAgentsScan= createAction(types.GET_AGENTS_SCAN)
export const getScanHtmlPrevious= createAction(types.GET_SCAN_HTML_PREVIOUS)
export const getScanHtmlCurrent= createAction(types.GET_SCAN_HTML_CURRENT)
export const getScanWebHistories= createAction(types.GET_SCANS_HISTORIES_WEB_SCANNER)


export const updateDataState = createAction(types.UPDATE_DATA_STATE);