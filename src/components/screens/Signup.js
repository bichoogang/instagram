import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userSign } from '../../action/user'
// import M from 'materialize-css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
    const [data, setdata] = useState({
        name: "", email: "", password: "", cpassword: "", photo: "", username: ""
    })
    // const [photo, setphoto] = useState()
    const [pic, setpic] = useState()
    const history = useHistory()
    const err = useSelector((state) => state.error.msg)
    const succ = useSelector((state) => state.user.signin)
    const dispatch = useDispatch()

    // console.log('assetimgacc', acc)
    const [img, setimg] = useState();
    const [buffer, setbuffer] = useState();

    const [displayimage, setdisplayimg] = useState();
    const choosepic = (e) => {
        setpic(e.target.files[0])
        console.log(e)
        const render = new FileReader()
        render.onload = () => {
            if (render.readyState === 2) {
                setdisplayimg(render.result)
            }

        }
        render.readAsDataURL(e.target.files[0])

    }
    console.log('dis', displayimage)

    const postimg = () => {
        const dataa = new FormData()
        dataa.append("file", pic)
        dataa.append("upload_preset", "insta-clone")
        dataa.append("cloud_name", "sannu")
        fetch("https://api.cloudinary.com/v1_1/sannu/image/upload", {
            method: "post",
            body: dataa
        }).then(res =>
            res.json())
            .then(dataa => {
                // console.log(data)
                setdata({ ...data, photo: dataa.url })

            }).catch(err => console.log(err))

    }
    const postData = () => {
        if (pic) {
            postimg()
        } else {
            dispatch(userSign(data))

        }



    }
    useEffect(() => {
        if (data.photo) {
            console.log("img", data.photo)
            dispatch(userSign(data))
            // console.log('dat',data)
        }
        if (succ) {


            // M.toast({ html: "Register Sucessfully", classes: "#00e676 green accent-3" })
            toast('Register Sucessfully')
            return history.push('/login')
        }
        if (err) {
            // return M.toast({ html: err, classes: "#d32f2f red darken-2" })
            toast.error(err)

        }

    }, [err, succ, history, data.photo])
    // console.log(data)


    return (
        <div className='signpage'>
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-4 col-md-6 offset-xl-4 offset-md-3 col-10 offset-1'>
                        <div className="mycard">
                            <div className="card auth_card ">
                                <h2>Instagram</h2>
                                {/* <p>Sign up to see photos and videos from your friends.</p> */}
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={data.username}
                                    onChange={(e) => setdata({ ...data, username: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={data.name}
                                    onChange={(e) => setdata({ ...data, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={data.email}
                                    onChange={(e) => setdata({ ...data, email: e.target.value })}
                                />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={(e) => setdata({ ...data, password: e.target.value })}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    value={data.cpassword}
                                    onChange={(e) => setdata({ ...data, cpassword: e.target.value })}
                                />
                                <div className='inputfiletype'>
                                    <img src={displayimage ? displayimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLRRlnHwl0Fjl-hOIrc6ZAS8BgFgbzbYPpg&usqp=CAU'} />
                                    {/* <div className="btn #64b5f6 blue darken-2">
                        <span>Upload Image</span>
                        <input type="file" onChange={(e) => setpic(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload one or more files" />
                    </div> */}
                                    <input type="file" name="file" id="file" class="inputfile" onChange={choosepic} />
                                    <label for="file">Choose Profile Pic</label>

                                </div>

                                <button className="btn mt-2 waves-effect waves-light #64b5f6 blue lighten-2" onClick={postData}>Signup
                                </button >
                                <h5>
                                    Already have an acount ? <Link to='/login'>Login</Link>
                                </h5>


                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>

    )
}

export default Signup
