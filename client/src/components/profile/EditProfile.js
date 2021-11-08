import { Button, Form, Input,Spin,Upload } from "antd";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import { useState,useEffect } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import {EditUser} from './../../services/User'
import ImgCrop from 'antd-img-crop'
import {DeletePhoto} from './../../services/File'


export default function EditProfile() {
    let params = useParams()
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    let [err,setErr]= useState()
    let [loading,setLoading] = useState(true)
    let [load,setLoad]=useState(false)
    let [user,setUser] = useState([])
    const [form] = Form.useForm()

    async function fetchData(){
        await axios.get(`/api/user/${params.username}`).then(res=>{
            setUser(res.data.user)
            document.title = "Edit | "+res.data.user.username
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line  
    },[])

    const onFinish = async(values) => {
        setLoad(true)
        await EditUser(values,user).catch(err=>{
            setErr(err.response.data.msg)
        })
        setLoad(false)
    }


    const submitFile = async ({file,onSuccess}) => {
        console.log(file)
        const fd = new FormData();
        fd.append('file', file, file.name);
        await axios.post('/file/upload',fd,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res=>{
            let values= {avatar:res.data}
            localStorage.setItem('avatar',res.data)
            console.log(res.data)
            EditUser(values,user).catch(err=>{
                console.log(err)
            }).then(res=>{
                if(user.avatar!=='6187fbd8b0f580a0eb97a71d'){
                    DeletePhoto(user.avatar).then(res=>{
                    onSuccess("ok");
                    fetchData()
                })
                }else{
                    onSuccess("ok");
                    fetchData()
                }
                
            })
        },err=>{
            console.log(err)
        })
    }

    return (
        
        <Content className="grid" style={{width:"60%"}}>
            {loading ? <><center><h1>Loading...</h1></center></> :
            <>
            <div className="item" style={{paddingTop:"70px"}}>
            <img src={`/file/${user.avatar}`} alt="Profile Pic" className="profile-pic"/>
            <br/>
            <ImgCrop >
                <Upload style={{width:"100%"}} maxCount={1} accept=".jpg, .png, .jpeg" name="file" customRequest={submitFile} showUploadList={false}>
                    <Button type="primary" className="edit-button">Upload new photo</Button>
                </Upload>
            </ImgCrop>
            </div>
            <div className="item">
            <Form
            labelCol={{
                span:4
            }}
            form={form}
            name="update"
            onFinish={onFinish}
            className="form"
            >
                <Form.Item
                name="username"
                label="Username"
                initialValue={user.username}>
                    <Input/>
                </Form.Item>
                <Form.Item
                name="name"
                label="Name"
                initialValue={user.name}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                name="email" 
                label="E-mail"
                initialValue={user.email}
                rules={[
                    {
                        type:'email',
                        message:"Provide email"
                    }
                ]}>
                    <Input/>
                </Form.Item>
                {err && <p style={{color:'red',display:"inline"}}>{err}</p>}
                <Button type="primary" htmlType="submit" className="login-form-button" style={{float:"right"}}>
                    Update
                </Button>
                {load&&<Spin indicator={antIcon} className="spin"/>}
            </Form>
            </div>
            </>
            }
        </Content>
    )
}
