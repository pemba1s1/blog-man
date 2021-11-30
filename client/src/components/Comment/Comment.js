import React, { useState } from 'react'
import { Avatar,Comment,Tooltip,Dropdown,Menu } from "antd";
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';
import { deleteComment } from "../../services/Comment";
import { EllipsisOutlined } from '@ant-design/icons';
import EditComment from './EditComment';

var relativeTime = require('dayjs/plugin/relativeTime')
export default function Commentt({comment,fetchCmt}) {
    let [edit,setEdit] = useState(false)
    const menu = (
        <Menu>
            <Menu.Item key="0" className="menu-item">
            <p onClick={()=>setEdit(true)}>Edit</p>
            </Menu.Item>
            <Menu.Item key="1" className="menu-item">
            <p onClick={async()=>{
                    await deleteComment(comment._id)
                    fetchCmt()
                }}>Delete</p>
            </Menu.Item>
        </Menu>
    )

    return (
            <Comment
            author={<Link to={`/user/${comment.authorId.username}`}>{comment.authorId.username}</Link>}
            avatar={<Avatar src={`/file/${comment.authorId.avatar}`} alt="Han Solo" />}
            content={
                <>
                {comment.authorId._id===localStorage.getItem('userId') && 
                <>
                <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                <EllipsisOutlined className="comment-dot"/>
                </Dropdown>
                </>
                }
                {edit?
                <EditComment commentId={comment._id} fetchCmt={fetchCmt} setEdit={setEdit}/>
                :
                <p>
                {comment.comment}
                </p>
                }
                </>
            }
            datetime={
                <Tooltip>
                <span>
                {dayjs.extend(relativeTime)}{dayjs(comment.createdAt).fromNow()}</span>
                </Tooltip>
            } />
    )
}
