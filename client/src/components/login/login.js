import { Content } from "antd/lib/layout/layout";
import {Form, Input, Button, Checkbox,Spin} from 'antd'
import { UserOutlined, LockOutlined,LoadingOutlined } from '@ant-design/icons';
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    let [err,setErr] = useState('')
    let [load,setLoad]=useState(false)
    let navigate = useNavigate()
    const onFinish = async (values) => {
        setErr("")
        setLoad(true)
        await axios.post('/api/user/login',values).then(res=>{
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('userId',res.data.user.userId)
            localStorage.setItem('avatar',res.data.user.avatar)
            setLoad(false)
            navigate('/')
        },err=>{
            setLoad(false)
            setErr(err.response.data.msg)
        })
      };
    return (
        <Content className="container">
            <Form
            name="normal_login"
            className="form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            style={{width:"30%"}}
            >
            <center><h1>Log in to your account.</h1></center>
            <Form.Item
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your Username!',
                },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
                ]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            {err && <p style={{color:'red'}}>{err}</p>}
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="#">
                Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
                </Button>{load&&<Spin indicator={antIcon} style={{marginLeft:"10px",marginTop:"3px"}}/>}<br/>
                Or <Link to="/signup">register now!</Link>
            </Form.Item>
            </Form>
        </Content>
    )
}
