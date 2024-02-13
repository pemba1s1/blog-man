import { Content } from "antd/lib/layout/layout"
import {
    Form,
    Input,
    Button,
    Spin
  } from 'antd';
  import instance from "../../router/axiosInstance";
import { useNavigate } from "react-router";
import {useState} from 'react'
import { LoadingOutlined } from '@ant-design/icons';

export default function Signup() {
    let [err,setErr]= useState('')
    let [load,setLoad] = useState('')
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [form] = Form.useForm()
    let navigate= useNavigate()
    const onFinish = async(values) => {
        setErr('')
        setLoad(true)
        await instance.post('/api/user/signup',values).then(res=>{
            console.log(res)
            setLoad(false)
            navigate("/login")
        },err=>{
            setLoad(false)
            setErr(err.response.data.msg)
        })
    }
    return (
        <Content className="container">
            <Form 
            labelCol={{
                span:5
            }}
            form={form}
            className="form"
            name="register"
            onFinish={onFinish}
            >
            <center><h1>Create your account for free.</h1></center>
            <br/>
                <Form.Item
                name="username"
                label="Username"
                rules={[
                    {
                        required:true,
                        message:'Username required'
                    }
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required:true,
                        message:'Fullname is required'
                    }
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item 
                name="email" 
                label="E-mail"
                rules={[
                    {
                        type:'email',
                        message:'The input is not a valid email'
                    },
                    {
                        required:true,
                        message:'Email is required'
                    }
                ]}>
                    <Input/>
                </Form.Item>    
                <Form.Item 
                name="password"
                label="Password"
                rules={[
                    {
                        required:true,
                        message:'Input Password'
                    }
                ]}
                hasFeedback>
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required:true,
                        message:'Please confirm your password!'
                    },
                    ({getFieldValue})=>({
                        validator(_,value){
                            if(!value || getFieldValue('password')===value){
                                return Promise.resolve()
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        }
                    })
                ]}>
                    <Input.Password/>
                </Form.Item>
                {err && <p style={{color:'red',display:"inline"}}>{err}</p>}
                <Button type="primary" htmlType="submit" className="login-form-button" style={{float:"right"}}>
                    Register
                </Button>
                {load&&<Spin indicator={antIcon} className="spin"/>}
            </Form>
        </Content>
    )
}
