import { Content } from "antd/lib/layout/layout"
import {
    Form,
    Input,
    Button,
    Spin,
    Upload
  } from 'antd';
import { LoadingOutlined,UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { useNavigate } from "react-router";
import { useState,useEffect } from "react";

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
export default function CreateBlog() {
    let [file, setFile] = useState(null);
    let [load,setLoad]=useState(false)
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [form] = Form.useForm()
    let navigate=useNavigate()

    useEffect(()=>{
        document.title="New Blog"
    })


    const onFinish = async (values) => {
        setLoad(true)
        const fd = new FormData();
        fd.append('file', file, file.name);
        await axios.post('/file/upload',fd,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res=>{
            console.log(res.data)
            values = {...values,photo:res.data}
             axios.post('/api/v1/blogs',values,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(res=>{
                console.log(res)
                setLoad(false)
                navigate('/')
            },err=>{
                console.log(values)
                console.log("Something went wrong. Failed to write blog. Try again")
            })
        },err=>{
            console.log(err)
        })
        
    }
    const handleFile = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0])
      };
    return (
        <Content className="container" style={{minHeight:"800px"}}>
            <Form
            labelCol={{
                span:3
            }}
            wrapperCol={{
                span: 20,
            }}
            form={form}
            name="create"
            onFinish={onFinish}>
            <center><h1>Write new blog</h1></center>
            <Form.Item
            name="title"
            label="Title"
            rules={[
                {
                    required:true,
                    message:"Write title"
                }
            ]}>
                <Input />
            </Form.Item>
            <Form.Item
            name="description"
            label="Description"
            rules={[
                {
                    required:true,
                    message:"Write description"
                }
            ]}>
                <Input.TextArea rows={5}/>
            </Form.Item>
            <Form.Item
            name="content"
            label="Content"
            rules={[
                {
                    required:true,
                    message:"Write content"
                }
            ]}>
                <Input.TextArea rows={20}/>
            </Form.Item>
            <Form.Item label="Photo" onChange={handleFile}>
                <Upload.Dragger maxCount={1} accept=".jpg, .png, .jpeg" name="file" customRequest={dummyRequest} listType="picture">
                    <p><UploadOutlined /></p>
                    <p>Click or drag file to this area to upload</p>
                </Upload.Dragger>
            </Form.Item>
            <Form.Item name="writer" noStyle initialValue={localStorage.getItem('userId')}>
                <Input type="hidden" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{float:"right",marginRight:"40px"}}>
                Write
            </Button>
            {load&&<Spin indicator={antIcon} className="spin"/>}
            </Form>
        </Content>
    )
}
