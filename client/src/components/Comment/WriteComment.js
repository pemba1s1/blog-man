import React, { useState } from 'react'
import { Form, Button, Input} from 'antd'
import { writeComment } from "../../services/Comment";
import { useNavigate } from 'react-router';


export default function WriteComment({blogId}) {
    let [comment,setComment] = useState('')
    let navigate = useNavigate()
    const handleChange = (e) => {
        setComment(e.target.value)
    }
    const onSubmit = () => {
        if(localStorage.getItem('token')){
            writeComment({blogId,comment})
        }
        navigate('/login')
    }
    return (
        <>
        <Form.Item>
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }}  onChange={handleChange}  value={comment}/>
            </Form.Item>
            <Form.Item>
            <Button htmlType="submit"  onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
        </>
    )
}
