import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getallitems, updateitem, updatelike, updateunlike,comment } from '../../action/item'
import { follow, userprofile, unfollow } from '../../action/user'
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

function Userprofile() {
    const { userid } = useParams()
    // console.log(userid)
    const history = useHistory()
    const [profile, setprofile] = useState(true)
    const [imgdetail, setimgdetail] = useState()
    const [text,settext] = useState()
    const dispatch = useDispatch()
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const user = useSelector((state) => state.user.user)
    const item = useSelector(state => state?.add)
    const usera = useSelector((state) => state.user.user)
    useEffect(() => {
        dispatch(userprofile(userid))
    }, [user,item])
    
    const userr = localStorage.getItem('user')
    const userr1 = JSON.parse(userr)
    // const items = useSelector((state) => state.item)
    console.log(user)

    // useEffect(() => {
    //     if (item) {
    //         // setShow(false)
            
    //         toast('Posted Succesfully')
    //     }

    // }, [])
    const photodetail = (data) => {
        // seteimg(false)
        setimgdetail(data)
        setShow(true)

    }

    return (
        <>
            {user ?



                <div style={{
                    maxWidth: "950px",
                    margin: "0 auto"
                }}>
                    <div style={{

                        display: "flex",
                        justifyContent: "space-around",
                        margin: "18px 0px",
                        paddingBottom: "15px",
                        borderBottom: "1px solid grey"
                    }}>
                        <div>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px", margin: "5px 5px", cursor: 'pointer' }}
                                src={user?.user?.photo ? user?.user?.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLRRlnHwl0Fjl-hOIrc6ZAS8BgFgbzbYPpg&usqp=CAU"} alt="" />
                        </div>
                        <div>
                            <h4>{user.user ? user.user.name : null}</h4>
                            <h6>{user.user ? user.user.email : null}</h6>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "108%"

                            }}>
                                <h6>{user.item ? user.item.length : 0} posts</h6>
                                <h6>{user.user.followers ? user.user.followers.length : 0} followers</h6>
                                <h6>{user.user.following ? user.user.following.length : 0} following</h6>
                            </div>
                            {user.user._id !== userr1._id ?
                                user.user.followers.includes(userr1._id) ? <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => {
                                    dispatch(unfollow(user.user._id))
                                    setprofile(true)
                                }}>Unfollow
                                </button > :
                                    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => {
                                        dispatch(follow(user.user._id))
                                        setprofile(false)
                                    }}>Follow
                                    </button > : null
                            }


                        </div>
                        <Modal show={show} onHide={handleClose}>
                    <Modal.Header >
                        

                    </Modal.Header>
                    <Modal.Body>
                    
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


                        {user?.item ?
                            user?.item.map((val, index) => {
                                return <div className=' col-4  '>
                                    <div className='itemimg'>
                                        <img className="itemv" src={val.photo} className="img-fluid" alt="" onClick={() => photodetail(val)} />
                                    </div>

                                </div>

                            }) : <h2>Loading...</h2>
                        }


                    </div>
                    <ToastContainer/>

                </div>
                : <h2>Loading</h2>}
        </>
    )
}

export default Userprofile
