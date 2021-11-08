import { Content } from "antd/lib/layout/layout";
import { List, Avatar, Skeleton,Image } from 'antd';
import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs"

export default function Home() {
    const [blogs,setBlogs] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        async function fetchData(){
            await axios.get('/api/v1/blogs').then(res=>{
                setBlogs(res.data.blogs)
                setLoading(false)
            },err=>{
                console.log(err)
            })
        }      
        fetchData()  
        document.title = "Blogs"
        console.log(blogs)
    // eslint-disable-next-line  
    },[])
    return (
        <Content className="container">
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
                        <Image preview={false} src={`/file/${item.photo}`} alt="logo" className="img"/>
                    }
                >
                <List.Item.Meta 
                    avatar={<Avatar src={`/file/${item.writer.avatar}`}/>}
                    title={<Link to={`/user/${item.writer.username}`}>{item.writer.name}</Link>}
                    description={<Link to={`/blog/${item._id}`}>{item.title}</Link>}
                />
                <Link to={`/blog/${item._id}`}>{item.description}</Link>
                <div className="date">
                    {dayjs(item.createdAt).format('MMM DD, YYYY')}
                </div>
                
                </List.Item>
            )}
            
        />
        }
        </Content>
    )
}
