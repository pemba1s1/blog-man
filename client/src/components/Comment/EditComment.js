import React, { useState } from 'react'
import { Form, Button, Input} from 'antd'
import { editComment } from "../../services/Comment";
import { useNavigate } from 'react-router';


export default function EditComment({commentId,fetchCmt,setEdit}) {
    let [comment,setComment] = useState('')
    let navigate = useNavigate()
    const handleChange = (e) => {
        setComment(e.target.value)
    }
    const onSubmit = async() => {
        if(localStorage.getItem('token')){
            await editComment({commentId,comment,setEdit})
            fetchCmt()
        }else{
            navigate('/login')
        }
        
    }
    return (
        <>
        <Form.Item>
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }}  onChange={handleChange}  value={comment}/>
            </Form.Item>
            <Form.Item>
            <Button htmlType="submit"  onClick={onSubmit} type="primary">
                Edit Comment
            </Button>
        </Form.Item>
        </>
    )
}
