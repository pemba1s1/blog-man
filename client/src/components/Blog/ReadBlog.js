import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import axios from 'axios'
import {Link, useParams,useNavigate} from 'react-router-dom'
import { Avatar, Button, Skeleton,Image,Divider } from "antd";
import {Del} from './../../services/Blog'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify';
import { getComment } from "../../services/Comment";
import Commentt from "../Comment/Comment";
import WriteComment from "../Comment/WriteComment";


export default function ReadBlog() {
    let [loadingComment,setLoadingComment] = useState(true)
    let [comments,setComments]= useState([])
    let [loading,setLoading] = useState(true)
    let navigate = useNavigate()
    let params = useParams()
    let [blog,setBlog] = useState([])

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line  
    }, [comments.length])

    const fetchData= async()=>{
        await getComment(params.id).then(res=>{
            setComments(res)
            setLoadingComment(false)
        }).catch(err=>{
            console.log(err)
        })
        await axios.get(`/api/v1/blogs/${params.id}`).then(res=>{
                    setBlog(res.data.blog)
                    setLoading(false)
                    document.title = res.data.blog.title || blog.title
                })
        
    }
    return (
        <Content className="container" style={{marginTop:"30px"}}>
        {loading?<Skeleton active avatar paragraph={{ rows: 4 }}/>:
            <>
            <div> 
            {
                blog.writer._id===localStorage.getItem('userId')&&
                <div style={{marginBottom:"10px"}}>
                    <Button type="primary" className="login-form-button" >
                        <Link to={`/blog/update/${blog._id}`}>Edit</Link>
                    </Button>
                    <Button type="danger" onClick={async()=>{
                        await Del(blog)
                        navigate('/')
                        }} className="login-form-button" style={{float:"right"}}>
                        Delete
                    </Button>
                </div>
            }               
                <Avatar size="large" src={`/file/${blog.writer.avatar}`}/> 
                <div style={{display:"inline",marginLeft:"10px"}}>
                <Link to={`/user/${blog.writer.username}`}><p className="profile-name">{blog.writer.name}</p></Link>
                </div>                
                <div style={{float:"right"}}>                    
                    {dayjs(blog.createdAt).format('MMM DD, YYYY')}
                </div>
            </div>
            <Divider />
            <div className="title">
                <h1 style={{fontSize:"25px"}}>{blog.title}</h1>
                <p style={{fontSize:"15px"}}>{blog.description}</p>
            </div>
            <div className="flex-image">
            <Image preview={false} src={`/file/${blog.photo}`} alt="logo" style={{width:"100%",marginBottom:"15px"}}/>
            </div>
            <div className="content">
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(blog.content)}}></p>
            </div>
            <Divider />
            <div className="comment">
                Comments
                <WriteComment blogId={blog._id} fetchCmt={fetchData}/>
                {loadingComment?<p>Loaing comment</p>:
                <>{comments.map((comment)=>(
                    <Commentt key={comment._id} comment={comment} fetchCmt={fetchData}/>
                ))}</>
                }
            </div>
            </>
        }
            
        </Content>
    )
}
