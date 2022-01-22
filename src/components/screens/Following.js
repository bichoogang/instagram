import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getfollowingitem, updateitem, updatelike, updateunlike, comment } from '../../action/item'

function Following() {
    const items = useSelector((state) => state.item)
    const user = useSelector((state) => state.user.user)
    const[text, settext] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getfollowingitem())
    }, [dispatch,user,items])
    console.log({
        user,
        items
    })
    
    

    
    return (
        
            
        
        <div className="home">
            <div className='container'>
                <div className='row w-100'>
                   
                    { items?
                items?.getitem?.map((val, index) => {
                   
                    return (
                        
                        <div className='col-md-8 offset-md-2 col-12 offset-0'>
                        <div className="card home-card" key={index}>
                            
                            
                            {/* <h5><Link to={val.postedBy?"/profile/"+val.postedBy._id:null}>{val.postedBy?val.postedBy.name:null}</Link></h5> */}
                            <div className='posthead'>
                                                <img src={val?.postedBy?.photo ? val?.postedBy?.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLRRlnHwl0Fjl-hOIrc6ZAS8BgFgbzbYPpg&usqp=CAU"} className='img-fluid' />
                                                <h5><Link to={val.postedBy ? "/profile/" + val.postedBy._id : null}>{val.postedBy ? val.postedBy.name : null}</Link></h5>
                                            </div>
                            <div className="card-image">
                                <img src={val.photo} alt="" />
                            </div>
                            <div className="card-content">
                               
                                {user.user && user && val.likes ?
                                                    val.likes.includes(user.user._id) ?
                                                        <i className="material-icons" style={{ color: "red" }} onClick={() => dispatch(updateunlike({ postId: val._id }))}>favorite</i> :
                                                        <i className="material-icons" onClick={() => dispatch(updatelike({ postId: val._id }))}>favorite</i> : null

                                                }
                                
                                
                                <h6>{val.likes?val.likes.length:null} likes</h6>
                                <h6>{val.title?val.title:null}</h6>
                                <p>{val.body?val.body:null}</p> 
                                { val.comments?
                                
                                    val.comments.map((val)=>{
                                        return <p><span style={{fontWeight:"bold"}}>{val.postedBy.name} </span>{val.text}</p>
                                    }):null
                                }
                                <form onSubmit={((e)=>{
                                    e.preventDefault()
                                    dispatch(comment(val._id,text))
                                    settext("")
                                })}>
                                <input
                                    type="text"
                                    placeholder="add a comment" value={text} onChange={(e)=>settext(e.target.value)}/>

                                </form>
                                
                            </div>
                            

                        </div>
                        </div>

                    )
                }):<h2>No following</h2>
            }
           


                    </div>
                
            </div>
            
         
        </div>
    
    )
}

export default Following
