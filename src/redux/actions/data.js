import * as types from "../constants/data";

export const getAgents = (data) => templateAction(types.GET_AGENTS, data);

export const templateAction = (type, payload) => {
    return {
        type:type,
        payload:payload
    }
};
