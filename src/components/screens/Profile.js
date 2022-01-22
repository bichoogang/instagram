import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getitem } from '../../action/item'
import { loadUser, updatepic, updatepicnew } from '../../action/user'
import { getallitems, updateitem, updatelike, updateunlike, comment, delitem } from '../../action/item'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const [pic, setpic] = useState()
    const dispatch = useDispatch()
    const [photo, setphoto] = useState()
    const [show, setShow] = useState(false);
    const [text, settext] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [imgdetail, setimgdetail] = useState()
    // const [pic, setpic] = useState()

    const [displayimage, setdisplayimg] = useState();
    const [eimg, seteimg] = useState(false)
    const item = useSelector(state => state?.addnew)
    const usera = useSelector((state) => state.user.user)
    const items = useSelector((state) => state.item?.getitem)
    const user = useSelector((state) => state.user.user.user)

    useEffect(() => {
        dispatch(getitem())
        dispatch(loadUser())
    }, [item])
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

        if (pic) {
            console.log('picc', pic)
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
                    setphoto(dataa.url)

                }).catch(err => console.log(err))
        }
        if (photo) {
            console.log('photoo', photo)
            dispatch(updatepic(photo))
        }
    }, [])
   
    console.log('usee', user)

    const postimg = (file) => {
        setpic(file)


    }
    const updatepropic = () => {
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
                // setphoto(dataa.url)
                dispatch(updatepicnew({ photo: dataa?.url }))

            }).catch(err => console.log(err))
    }
    const photodetail = (data) => {
        seteimg(false)
        setimgdetail(data)
        setShow(true)

    }
    console.log('vvvv', imgdetail)
    useEffect(() => {
        if (item) {
            setShow(false)

            toast('Posted Succesfully')
        }

    }, [item])

    return (

        <div style={{
            maxWidth: "950px",
            margin: "0 auto"
        }}>
            <div style={{

                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey",

            }}>
                <div>{user ?
                    user.photo ?
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px", cursor: 'pointer' }}
                            src={user ? user.photo : null} alt="no dp" onClick={() => {
                                setShow(true)
                                seteimg(true)
                                setimgdetail('')

                            }} /> : <img style={{ width: "160px", height: "160px", borderRadius: "80px", cursor: 'pointer' }}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLRRlnHwl0Fjl-hOIrc6ZAS8BgFgbzbYPpg&usqp=CAU" alt="no dp" onClick={() => {
                                    setShow(true)
                                    seteimg(true)
                                    setimgdetail('')

                                }} /> : null
                }
                    <div className="file-field input-field">
                        {/* <div className="btn #64b5f6 blue darken-2">
                            <span>Update profile pic</span>
                            <input type="file" onChange={(e) => postimg(e.target.files[0])} />

                        </div> */}
                        {/* <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload one or more files" />
                    </div> */}

                    </div>
                </div>

                <div>
                    <h4>{user ? user.name : null}</h4>
                    <h6>{user ? user.email : null}</h6>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%"

                    }}>
                        <h6 style={{ padding: "0 5px" }}>{items ? items.length : 0} posts</h6>
                        <h6 style={{ padding: "0 5px" }}>{user ? user.followers.length : 0} followers</h6>
                        <h6>{user ? user.following.length : 0} following</h6>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header >
                        {
                            eimg ? <Modal.Title >Change Profile Photo</Modal.Title> : null
                        }

                    </Modal.Header>
                    <Modal.Body>
                        {/* <button className='mb1' for="file">Upload Photo</button> */}
                        {
                            eimg ? <>
                                {
                                    displayimage ? <>
                                        <img src={displayimage} className='img-fluid' />
                                        <button className='mb1' onClick={

                                            updatepropic
                                        }>Update Photo</button>
                                    </> :

                                        <>
                                            <input type="file" name="file" id="file" class="inputfile" onChange={choosepic} />
                                            <label className='mb1' for="file">Choose Profile Pic</label>
                                            <button className='mb2' onClick={() => {
                                                dispatch(updatepicnew({ photo: "" }))
                                            }}>Remove Photo</button>
                                            <button className='mb3' onClick={() => setShow(false)}>Cancel</button>
                                        </>
                                }
                            </> : null
                        }
                        {
                            imgdetail ?
                                <div className='container'>
                                    <div className='row'>
                                        <div className='imgdetail col-12'>
                                            <div className='imgd'>
                                                <img src={imgdetail?.photo} className='img-fluid' />
                                            </div>
                                            <div className="card-content">

                                                {/* {user && user.user._id && val.likes ?
val.likes.includes(user.user._id) ?
<i className="material-icons" onClick={() => dispatch(updateunlike({ postId: val._id }))}>thumb_down</i> :

<i className="material-icons" onClick={() => dispatch(updatelike({ postId: val._id }))} >thumb_up</i> : null

} */}
                                                {usera?.user && usera && imgdetail?.likes ?
                                                    imgdetail.likes.includes(user.user?._id) ?
                                                        <i className="material-icons" style={{ color: "red" }} onClick={() => dispatch(updateunlike({ postId: imgdetail._id }))}>favorite</i> :
                                                        <i className="material-icons" onClick={() => dispatch(updatelike({ postId: imgdetail._id }))}>favorite</i> : null

                                                }


                                                {/* {userr1 && val.postedBy ?
                                                    userr1._id === val.postedBy._id ? <i className="material-icons" onClick={() => dispatch(delitem(val._id))} >delete</i> : null
                                                    : null} */}

                                                <h6>{imgdetail.likes ? imgdetail.likes.length : null} likes</h6>
                                                {/* <h6>{val.title ? val.title : null}</h6> */}
                                                <h5><Link to={imgdetail.postedBy ? "/profile/" + imgdetail.postedBy._id : null}>{imgdetail.postedBy ? imgdetail.postedBy.name : null}</Link></h5>
                                                <p>{imgdetail.body ? imgdetail.body : null}</p>
                                                <div className='homecomment'>
                                                    {imgdetail.comments ?

                                                        imgdetail.comments.map((d) => {
                                                            return <p><span style={{ fontWeight: "bold" }}>{d.postedBy.name} </span>{d.text}</p>
                                                        }) : null
                                                    }
                                                </div>
                                                <form onSubmit={((e) => {
                                                    e.preventDefault()
                                                    dispatch(comment(imgdetail._id, text))
                                                    settext("")
                                                })}>
                                                    <input
                                                        type="text"
                                                        placeholder="add a comment" value={text} onChange={(e) => settext(e.target.value)} />

                                                </form>


                                            </div>


                                        </div>


                                    </div>
                                </div>
                                : null
                        }



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
            </div>
            <div className="galleryx row">


                {items ?
                    items.map((val, index) => {
                        return <div className=' col-4  ' >
                            <div className='itemimg'>
                                <img className="itemv" src={val.photo} className="img-fluid" alt="" onClick={() => photodetail(val)} />
                            </div>

                        </div> 

                    }) : <h2>Loading...</h2>
                }


            </div>
            <ToastContainer />

        </div>
    )
}

export default Profile
