export const INITIAL_STATE = {
    userMessages: {},
    isLoading: false,

}

export const MessagesReducer = ( state, action ) => {
    switch(action.type){
        case 'FETCH_START':
            return { ...state, isLoading: true }
        case 'FETCH_SUCCESS':
            return {
                isLoading: false,
                userMessages: action.payload
            }
        case 'FETCH_ERROR':
            return {}
        default:
            return state
    }
}