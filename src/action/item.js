import Axios from 'axios'
import {ADD_ITEMS, AUTH_ERROR, DELETE_ITEMS, GET_ERROR, GET_ITEMS, ITEMS_LOADING, UPDATE_ITEMS} from './types'


export const getallitems = ()=> async(dispatch)=>{
    try {
        dispatch({ type: ITEMS_LOADING });
        const itemData = await Axios.get("https://instagramone.herokuapp.com/item/allitems")
        dispatch({type:GET_ITEMS, payload:itemData})
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}
export const getitem = ()=> async(dispatch)=>{
    try {
        dispatch({ type: ITEMS_LOADING });
        const token = localStorage.getItem('token')
        const itemData = await Axios.get("https://instagramone.herokuapp.com/item/get", { headers: { "x-auth-token": token } })
        dispatch({type:GET_ITEMS, payload:itemData})
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}
export const getfollowingitem = ()=> async(dispatch)=>{
    try {
        dispatch({ type: ITEMS_LOADING });
        const token = localStorage.getItem('token')
        const itemData = await Axios.get("https://instagramone.herokuapp.com/item/allfollowing", { headers: { "x-auth-token": token } })
        dispatch({type:GET_ITEMS, payload:itemData})
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}

export const additem = (msgres)=>async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        const addData = await Axios.post("https://instagramone.herokuapp.com/item/post",msgres ,{ headers: { "x-auth-token": token } })
        dispatch({type:ADD_ITEMS, payload:addData})
    } catch (error) {
        dispatch({type:GET_ERROR, payload: error.response})
    }
}
export const delitem =(id)=> async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        const delData = await Axios.delete(`https://instagramone.herokuapp.com/item/delete/${id}`,{ headers: { "x-auth-token": token } })
        dispatch({type:DELETE_ITEMS, payload:delData})
        
    } catch (error) {
        dispatch({type:AUTH_ERROR})
        
    }
}

export const updateitem =(id, data)=>async(dispatch)=>{
    try {
        // const token = localStorage.getItem('token')
        const updateData = await Axios.patch(`http://localhost:8888/item/update/${id}`,data )
        dispatch({type:UPDATE_ITEMS, payload:updateData})
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}

//like

export const updatelike = (postId)=>async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        // console.log('val', postId)
        const updateData = await Axios.put(`https://instagramone.herokuapp.com/item/like`,postId,{ headers: { "x-auth-token": token } } )
        dispatch({type:UPDATE_ITEMS, payload:updateData})
        console.log('like',updateData)
        
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}
export const updateunlike = (postId)=>async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        // console.log('val', postId)
        const updateData = await Axios.put(`https://instagramone.herokuapp.com/item/unlike`,postId,{ headers: { "x-auth-token": token } } )
        dispatch({type:UPDATE_ITEMS, payload:updateData})
        console.log('like',updateData)
        
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}
export const comment = (postId,text)=>async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        // console.log('val', postId)
        const updateData = await Axios.put(`https://instagramone.herokuapp.com/item/comment`,{postId:postId, text:text},{ headers: { "x-auth-token": token } } )
        dispatch({type:UPDATE_ITEMS, payload:updateData})
        // console.log('like',updateData)
        
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}