export const INITIAL_STATE = {
    message: undefined,
    hasExpired: false,
    isLoading: false,
}

export const ViewMessageReducer = ( state, action ) => {
    switch(action.type){
        case 'FETCH_START':
            return {
                ...state,
                isLoading:true,
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                message: !action.payload.expired ? action.payload : {msg:'Message has expired!'},
                hasExpired: action.payload.expired,
            }
        case 'FETCH_ERROR':
            return {
                ...state,
                isLoading: false,
                hasExpired: undefined,
                message: {msg:'Something went wrong! No message with this ID exist!'}
            }
        default:
            return state 
    }
}