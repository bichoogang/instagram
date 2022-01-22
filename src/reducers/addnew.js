import { ADD_ITEMS, DELETE_ITEMS, GET_ITEMS, UPDATE_ITEMS, LIKE } from '../action/types'


const addnew= (state = "", action) => {
    switch (action.type) {
        case "ADDNEW":
            return action.payload.data
     

        default:
            return state
    }


}
export default addnew