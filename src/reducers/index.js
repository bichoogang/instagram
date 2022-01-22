import {combineReducers} from 'redux'
import user from './user'
import error from './error'
import item from './items'
import add from './add'
import addnew from './addnew'
export default (combineReducers)({
    item,
    user,
    error,
    add,
    addnew
})