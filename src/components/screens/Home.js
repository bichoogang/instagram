import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getallitems, updateitem, updatelike, updateunlike, comment, delitem } from '../../action/item'

function Home() {

    const user = useSelector((state) => state.user.user)
    const items = useSelector((state) => state.item?.getitem)
    const [text, settext] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getallitems())
    }, [dispatch, user, items])
    // console.log(items)


    const userr = localStorage.getItem('user')
    const userr1 = JSON.parse(userr)



    return (
        <div>


            <div className="home">
                <div className='container'>
                    <div className='row d-block'>


                        {user ?
                            items.map((val, index) => {
                                // console.log('val',val)
                                return (
                                    <div className='col-xl-6 col-md-8 offset-xl-3 offset-md-2 col-10 offset-1'>


                                        <div className="card home-card" key={index}>


                                            <div className='posthead'>
                                                <img src={val?.postedBy?.photo ? val?.postedBy?.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLRRlnHwl0Fjl-hOIrc6ZAS8BgFgbzbYPpg&usqp=CAU"} className='img-fluid' />
                                                <h5><a href={val.postedBy ? "/profile/" + val.postedBy._id : null}>{val.postedBy ? val.postedBy.name : null}</a></h5>
                                            </div>

                                            <div className="card-image">
                                                <img src={val.photo} alt="" />
                                            </div>


                                            <div className="card-content">

                                                {/* {user && user.user._id && val.likes ?
                                        val.likes.includes(user.user._id) ?
                                            <i className="material-icons" onClick={() => dispatch(updateunlike({ postId: val._id }))}>thumb_down</i> :

                                            <i className="material-icons" onClick={() => dispatch(updatelike({ postId: val._id }))} >thumb_up</i> : null

                                    } */}
                                                {user.user && user && val.likes ?
                                                    val.likes.includes(user.user._id) ?
                                                        <i className="material-icons" style={{ color: "red" }} onClick={() => dispatch(updateunlike({ postId: val._id }))}>favorite</i> :
                                                        <i className="material-icons" onClick={() => dispatch(updatelike({ postId: val._id }))}>favorite</i> : null

                                                }


                                                {userr1 && val.postedBy ?
                                                    userr1._id === val.postedBy._id ? <i className="material-icons" onClick={() => dispatch(delitem(val._id))} >delete</i> : null
                                                    : null}

                                                <h6>{val.likes ? val.likes.length : null} likes</h6>
                                                {/* <h6>{val.title ? val.title : null}</h6> */}
                                                <h5><a href={val.postedBy ? "/profile/" + val.postedBy._id : null}>{val.postedBy ? val.postedBy.name : null}</a></h5>
                                                <p>{val.body ? val.body : null}</p>
                                                <div className='homecomment'>
                                                    {val.comments ?

                                                        val.comments.map((val) => {
                                                            return <p><span style={{ fontWeight: "bold" }}>{val.postedBy.name} </span>{val.text}</p>
                                                        }) : null
                                                    }
                                                </div>
                                                <form onSubmit={((e) => {
                                                    e.preventDefault()
                                                    dispatch(comment(val._id, text))
                                                    settext("")
                                                })}>
                                                    <input
                                                        type="text"
                                                        placeholder="add a comment" value={text} onChange={(e) => settext(e.target.value)} />

                                                </form>


                                            </div>


                                        </div>
                                    </div>

                                )
                            }) : null
                        }

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home
