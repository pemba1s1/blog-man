import axios from 'axios'

export const getComment = (id) => {
    return axios.get(`/api/comment/${id}`).then(res=>{
        return res.data
    }).catch(err=>{
        console.log(err)
    })
}

export const deleteComment = async(id) => {
    await axios.delete(`/api/comment/${id}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }}).then(res=>{
        console.log("deleted comment")
    }).catch(err=>{
        console.log("failed to delete")
    })
}

export const editComment = async({commentId,comment,setEdit}) => {
    console.log(setEdit)
    await axios.patch(`/api/comment/${commentId}`,{comment:comment},{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }).then(res=>{
        console.log(res)
        setEdit()
    }).catch(err=>{
        console.log(err)
    })
}

export const writeComment = async ({blogId,comment}) => {
    const values = {blogId:blogId,comment:comment}
    await axios.post('/api/comment/',values,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }}).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
}