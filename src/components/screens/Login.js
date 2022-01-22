import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { loguser } from '../../action/user'
// import M from 'materialize-css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [data, setdata] = useState({
        email: "", password: ""
    })
    const history = useHistory()
    const err = useSelector((state) => state.error.msg)
    const succ = useSelector((state) => state.user.token)
    const dispatch = useDispatch()
    const postData = () => {
        dispatch(loguser(data))

    }
    useEffect(() => {

        if (succ) {
            // M.toast({html:"Login Sucessfully",classes:"#00e676 green accent-3"})
            toast("Login Sucessfully")
            return history.push('/')
        }
        if (err) {
            toast.error(err)
            //    return M.toast({html:err,classes:"#d32f2f red darken-2"})

        }
    }, [err, succ, history])
    return (
        <div className='signpage'>
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-4 col-md-6 offset-xl-4 offset-md-3 col-10 offset-1'>
                        <div className="mycard">
                            <div className="card auth_card ">
                                <h2>Instagram</h2>
                                <input
                                    type="text"
                                    placeholder="email or username"
                                    value={data.email}
                                    onChange={(e) => setdata({ ...data, email: e.target.value })}
                                />
                                <input
                                    type="password"
                                    placeholder="password"
                                    value={data.password}
                                    onChange={(e) => setdata({ ...data, password: e.target.value })}
                                />
                                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={postData}>Login
                                </button>
                                <h5>
                                    Dont have an acount ? <Link to='/signup'>Signup</Link>
                                </h5>


                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>

    )
}

export default Login
