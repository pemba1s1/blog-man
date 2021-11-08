import axios from 'axios'


export const Del =async (blog) => {
    await axios.delete(`/file/${blog.photo}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    await axios.delete(`/api/v1/blogs/${blog._id}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        console.log("Deleted")
    },err=>{
        window.alert('Failed to delete try again')
    })
}

export const Edit = async (values,blog) => {
    await axios.patch(`/api/v1/blogs/${blog._id}`,values,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res=>{
            console.log(res)
        },err=>{
            window.alert("Something went wrong. Failed to edit blog. Try again")
        })
}