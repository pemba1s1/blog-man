import React from 'react'
import { Avatar,Comment,Tooltip } from "antd";
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';

var relativeTime = require('dayjs/plugin/relativeTime')
export default function Commentt({comment}) {
    return (
            <Comment
            author={<Link to={`/user/${comment.authorId.username}`}>{comment.authorId.username}</Link>}
            avatar={<Avatar src={`/file/${comment.authorId.avatar}`} alt="Han Solo" />}
            content={
                <p>
                {comment.comment}
                </p>
            }
            datetime={
                <Tooltip>
                <span>
                {dayjs.extend(relativeTime)}{dayjs(comment.createdAt).fromNow()}</span>
                </Tooltip>
            } />
    )
}
