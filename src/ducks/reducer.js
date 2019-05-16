const initialState = {
    user : {
        projects: []
    }
}
const UPDATE_USER = 'UPDATE_USER'

export function updateUser(userobj){
    return {
        type: UPDATE_USER,
        payload: userobj
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_USER:
            return {...state, user:payload} 
            
        default:
            return state
    }
}