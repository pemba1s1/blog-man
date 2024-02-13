import { Content } from "antd/lib/layout/layout";
import { List, Avatar, Button, Skeleton, Image,Affix } from 'antd';
import instance from "../../router/axiosInstance";
import { useState,useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import { Del} from './../../services/Blog'
import dayjs from "dayjs"

export default function Profile() {
    let params = useParams()
    let [blogs,setBlogs] = useState([])
    let [user,setUser] = useState([])
    let [loading,setLoading] = useState(true)

    async function fetchData(){
        await instance.get(`/api/v1/blogs/user/${params.username}`).then(res=>{
            setBlogs(res.data.userBlogs)
            setUser(res.data.user)
            document.title = params.username
            setLoading(false)
        },err=>{
            console.log(err)
        })
    }
    useEffect(() => {
        fetchData()
    // eslint-disable-next-line  
    },[blogs.length])
    return (
        <Content className="grid">
            <Affix offsetTop={10}>
                <div className="item">
                    <Image src={`${process.env.REACT_APP_API_URL}/file/${user.avatar}`} className="profile-pic"/>
                    <h1>{user.name}</h1>
                    <p className="username">{user.username}</p>
                    {user._id===localStorage.getItem('userId')&&
                    <Button type="primary" className="edit-button"><Link to={`/user/edit/${user.username}`}>Edit Profile</Link></Button>}
                </div>
            </Affix>
                <div className="item">
                {loading?<><br/><Skeleton active avatar paragraph={{ rows: 4 }}/><Skeleton active avatar paragraph={{ rows: 4 }}/><Skeleton active avatar paragraph={{ rows: 4 }}/></>:
                    <List itemLayout="vertical" size="large" dataSource={blogs} className="list"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 6,
                            }}
                        renderItem={item=>(
                            <List.Item
                                className="litem"
                                key={item._id}
                                extra={
                                    <img src={`${process.env.REACT_APP_API_URL}/file/${item.photo}`} alt="logo" className="img"/>
                                }
                            >
                            <List.Item.Meta 
                                avatar={<Avatar src={`/file/${user.avatar}`}/>}
                                title={<Link to={`/user/${user.username}`}>{user.name}</Link>}
                                description={<Link to={`/blog/${item._id}`}>{item.title}</Link>}
                            />
                            <Link to={`/blog/${item._id}`}>{item.description}</Link>
                            <div className="date">
                            {dayjs(item.createdAt).format('MMM DD, YYYY')}
                            </div>
                            {
                            item.writer===localStorage.getItem('userId')&&
                            <div style={{position:'absolute',bottom:'5px'}}>
                                <Button type="primary" className="login-form-button" >
                                    <Link to={`/blog/update/${item._id}`}>Edit</Link>
                                </Button>
                                <Button type="danger" onClick={async()=>{
                                    await Del(item)
                                    fetchData()
                                    }} className="login-form-button" style={{marginLeft:"10px"}}>
                                    Delete
                                </Button>
                            </div>
                        } 
                            </List.Item>   
                        )}
                    />
                    }
                </div>
        </Content>
    )
}
