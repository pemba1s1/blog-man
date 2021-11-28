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
import { useNavigate,useParams } from "react-router";
import { useEffect,useState } from "react";
import {Edit} from './../../services/Blog'
import {DeletePhoto} from './../../services/File'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        // ["link", "image", "video"],
        ["clean"],
    ],
};

export default function EditBlog() {
    let [value,setValue] = useState('')
    let [file, setFile] = useState(null);
    let [load,setLoad]=useState(false)
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    let params=useParams()
    let [blog,setBlog] = useState([])
    let [loading,setLoading] = useState(false)
    const [form] = Form.useForm()
    let navigate=useNavigate()
    useEffect(() => {
        async function fetchData(){
            axios.get(`/api/v1/blogs/${params.id}`).then(res=>{
                if(res.data.blog.writer._id!==localStorage.getItem('userId')){
                    navigate('/')
                }
                setBlog(res.data.blog)
                console.log(res.data.blog)
                document.title = "Edit | " + res.data.blog.title
                setLoading(true)
            },err=>{
                console.log(err)
            })
        }
        fetchData()
    // eslint-disable-next-line    
    }, [])
    const onFinish = async (values) => {
        setLoad(true)
        const fd = new FormData();
        fd.append('file', file, file.name);
        await axios.post('/file/upload',fd,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res=>{
            values = {...values,photo:res.data}
            console.log(values)
            Edit(values,blog)
            DeletePhoto(blog.photo)
        },err=>{
            console.log(err)
        })
        setLoad(false)
        navigate('/')
    }
    const handleFile = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0])
      };
    return (
        <Content className="container" style={{minHeight:"800px"}}>
        {loading?
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
            initialValue={blog.title}
            rules={[
                {
                    required:true,
                    message:"Write title"
                }
            ]}>
                <Input/>
            </Form.Item>
            <Form.Item
            name="description"
            label="Description"
            initialValue={blog.description}
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
            initialValue={DOMPurify.sanitize(blog.content)}
            rules={[
                {
                    required:true,
                    message:"Write content"
                }
            ]}>
                <ReactQuill modules={modules} onChange={setValue} theme="snow"  />
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
                Update
            </Button>
            {load&&<Spin indicator={antIcon} className="spin"/>}
            </Form>
        :<><center><h1>Loading...</h1></center></>}
        </Content>
    )
}
