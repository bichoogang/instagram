import { ADD_ITEMS, DELETE_ITEMS, GET_ITEMS, UPDATE_ITEMS, LIKE } from '../action/types'


const add= (state = "", action) => {
    switch (action.type) {
        case ADD_ITEMS:
            return action.payload.data
     

        default:
            return state
    }


}
export default add