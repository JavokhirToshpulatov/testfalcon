export const createAction = (type) => {
    function usePayload (payload) {
        return {
            type: type,
            payload: payload
        }
    }

    return usePayload;
};