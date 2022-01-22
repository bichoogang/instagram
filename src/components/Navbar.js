import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, logout } from '../action/user'
import { CgAddR, CgHome } from "react-icons/cg";
import { Modal, Button } from 'react-bootstrap'
import { FaPhotoVideo } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { additem } from '../action/item';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Navbar() {
    const token = useSelector((state) => state.user.token)
    const item = useSelector(state => state?.add)
    console.log('item', item)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [pic, setpic] = useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [displayimage, setdisplayimg] = useState();
    const [next, setnext] = useState(0)
    const [body, setbody] = useState()
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
    useEffect(() => {
        // dispatch(getitem())
        dispatch(loadUser())
    }, [])
    useEffect(() => {
        if (item) {
            setShow(false)
            setdisplayimg('')
            setpic('')
            setbody('')
            setnext(0)
            toast('Posted Succesfully')
        }

    }, [item])
    const postDetails = () => {
        const data = new FormData()
        data.append("file", pic)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "sannu")
        fetch("https://api.cloudinary.com/v1_1/sannu/image/upload", {
            method: "post",
            body: data
        }).then(res =>
            res.json())
            .then(data => {
                dispatch(additem({ body: body, photo: data?.url }))
            }).catch(err => console.log(err))


    }
    const user = useSelector((state) => state?.user?.user?.user)
    console.log('user', user)
    return (
        <nav >
            <div className="nav-wrapper white" style={{ padding: "0 5px" }}>
                <a href={token ? "/" : "/login"} className="brand-logo left" style={{ padding: "0 10px" }}>Instagram</a>
                <ul id="nav-mobile" className="right">
                    {
                        token ? <>
                            {/* <li className='link'></li> */}
                            <li><a href="/" className="link"><CgHome /></a></li>
                            <li><a onClick={() => {
                                setShow(true)
                            }} className="link"><CgAddR /></a></li>
                            <li><a href="/profile" className="link">Profile</a></li>
                            <li><a href="/following" className="link">Myfollowing</a></li>
                            <li><a href="" onClick={() => dispatch(logout())} className="link" className="logout">Logout</a></li>

                        </> : <>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/signup">Signup</a></li>

                        </>
                    }


                </ul>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title >Create new post</Modal.Title>
                    <MdCancel className='cansvg' onClick={() => {
                        setdisplayimg('')
                        setpic('')
                        setbody('')
                        setnext(0)
                        setShow(false)
                    }} />
                </Modal.Header>
                <Modal.Body>
                    <div className='postbody'>
                        {next === 0 ? <>
                            {
                                displayimage ?
                                    <>
                                        <img src={displayimage} className='img-fluid' />
                                        <button className='btn btn-primary mt-3' onClick={() => setnext(1)}>Next</button>
                                    </>
                                    :
                                    <>
                                        <FaPhotoVideo />
                                        {/* <div className='btn btn-primary'> */}
                                        <input type="file" name="file" id="file" class="inputfile" onChange={choosepic} />
                                        <label className='btn btn-primary' for="file">Choose Image</label>
                                    </>}
                        </> : <>
                            <div className='row'>
                                <div className='col-6 finalleft'>
                                    <img src={displayimage} className='img-fluid fimg' />
                                </div>
                                <div className='col-6 finalright'>
                                    <div className='topone'>
                                        <img src={user?.photo ? user?.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLRRlnHwl0Fjl-hOIrc6ZAS8BgFgbzbYPpg&usqp=CAU"} className='img-fluid' />
                                        <h4>{user?.name}</h4>
                                    </div>
                                    <div className='bottomone'>
                                        <textarea placeholder='Write a Caption' onChange={(e) => setbody(e.target.value)} />
                                    </div>


                                </div>
                                <div className='col-12 d-flex justify-content-center'>
                                    <button className='btn btn-primary mt-3' onClick={postDetails}>Share</button>
                                </div>
                            </div>
                        </>
                        }

                        {/* </div> */}



                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer> */}
            </Modal>
            <ToastContainer/>



        </nav>

    )
}

export default Navbar
