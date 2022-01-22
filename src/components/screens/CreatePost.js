import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { additem } from '../../action/item'
// import M from 'materialize-css'


function CreatePost() {
    const [pic, setpic] = useState()
    const [post, setpost] = useState({
        title: "", body: "", photo: ""
    })
    const dispatch = useDispatch()
    useEffect(()=>{
        if(post.photo){
            dispatch(additem(post))  
            // M.toast({html:"Posted Sucessfully",classes:"#00e676 green accent-3"})
            setpost({
                title: "", body: "", photo: ""
            })
        }

    },[post.photo])

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
                setpost({...post,photo:data.url})
            }).catch(err => console.log(err))

          
    }
    return (
        <div className="card input-filed" style={{
            margin: "30px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
        }}>
            <input type="text" placeholder="title" value={post.title} onChange={(e) => setpost({ ...post, title: e.target.value })} />
            <input type="text" placeholder="body" value={post.body} onChange={(e) => setpost({ ...post, body: e.target.value })} />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-2">
                    <span>Upload Image</span>
                    <input type="file"  onChange={(e) => setpic(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload one or more files" />
                </div>

            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={() => postDetails()} >Submit Post
                </button>
        </div>
    )
}

export default CreatePost
