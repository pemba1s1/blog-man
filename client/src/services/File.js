import axios from 'axios'

export const DeletePhoto = async(photo) => {
    axios.delete(`/file/${photo}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
            },err=>{
                console.log(err)
            })
}