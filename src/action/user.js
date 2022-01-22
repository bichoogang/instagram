import Axios from 'axios'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCESS, REGISTER_SUCCESS, REGISTER_FAIL,  GET_ERROR , USER_PROFILE, ADD_ITEMS} from './types'


export const loadUser = () => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADED, payload: "" })
        dispatch({ type: USER_LOADING });
        
        const token = localStorage.getItem('token')
        console.log('hello ckik',token)
        
        const { data } = await Axios.get("https://instagramone.herokuapp.com/auth/user", { headers: { "x-auth-token": token } })
        console.log('tok', data)
        dispatch({ type: USER_LOADED, payload: data })



    } catch (error) {
        dispatch({ type: AUTH_ERROR })
        console.log('error',error.response)

    }
}
export const userSign = (signdata) => async (dispatch) => {
    try {
        
        const { data } = await Axios.post("https://instagramone.herokuapp.com/auth/signup", signdata)
        dispatch({ type: REGISTER_SUCCESS, payload: data })
        
    } catch (error) {

        dispatch({ type: REGISTER_FAIL })
        dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const loguser = (dat) => async (dispatch) => {
    try {
        const { data } = await Axios.post("https://instagramone.herokuapp.com/auth/login", dat)
        dispatch({ type: LOGIN_SUCCESS, payload: data })
    } catch (error) {

        dispatch({ type: LOGIN_FAIL })
        dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT_SUCESS })

}
export const userprofile =(id)=>async(dispatch)=>{
    try {
        // dispatch({ type: USER_PROFILE, payload: "" })
        const token = localStorage.getItem('token')
        const { data } = await Axios.get(`https://instagramone.herokuapp.com/user/userone/${id}`, { headers: { "x-auth-token": token } })
        // console.log('tok', data)
        dispatch({ type: USER_PROFILE, payload: data })
        
    } catch (error) {
        dispatch({ type: LOGIN_FAIL })
        
    }
}

export const updatepicnew =(dat)=>async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        const  dataa  = await Axios.patch(`https://instagramone.herokuapp.com/user/updatepic`, dat,{ headers: { "x-auth-token": token } })
        // console.log('tok', data)
        dispatch({ type: "ADDNEW", payload: dataa })
        
    } catch (error) {
        // dispatch({ type: LOGIN_FAIL })
        
    }
}
export const follow = (postId)=>async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        // console.log('val', postId)
        const updateData = await Axios.put(`https://instagramone.herokuapp.com/user/follow`,{followId:postId},{ headers: { "x-auth-token": token } } )
        console.log(updateData)
        // dispatch({type:USER_LOADED, payload:updateData})
        // console.log('like',updateData)
        
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}
export const unfollow = (postId)=>async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        // console.log('val', postId)
        const updateData = await Axios.put(`https://instagramone.herokuapp.com/user/unfollow`,{unfollowId:postId},{ headers: { "x-auth-token": token } } )
        console.log(updateData)
        // dispatch({type:USER_LOADED, payload:updateData})
        // console.log('like',updateData)
        
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}
export const updatepic = (photo)=>async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        // console.log('val', postId)
        const updateData = await Axios.put(`https://instagramone.herokuapp.com/user/picupdate`,photo,{ headers: { "x-auth-token": token } } )
        // console.log(updateData)
        dispatch({type:USER_LOADED, payload:updateData})
        // console.log('like',updateData)
        
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}
// export const clear = () => async (dispatch) => {
//     dispatch({ type: CLEAR_ERROR })
// }