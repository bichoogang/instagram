import { ADD_ITEMS, DELETE_ITEMS, GET_ITEMS, UPDATE_ITEMS, LIKE } from '../action/types'

const initial={
    getitem:[],
    updateitem:[],
    additem:[],
    delitem:[],
    like:[]
}
const item = (state=initial, action) => {
    switch (action.type) {

        case GET_ITEMS:
        
            return  {
                // ...state,
                getitem:action.payload.data
            }
        // case UPDATE_ITEMS:
        //     return [...state, action.payload.data]
        // case ADD_ITEMS:
        //     return [...state, action.payload]
        // case DELETE_ITEMS:
        //     return state.filter((state) => state._id !== action.payload)
        // case LIKE:

        //     return state.map((state) => state.id === action.payload._id ? action.payload : state)

        default:
            return state
    }


}
export default item