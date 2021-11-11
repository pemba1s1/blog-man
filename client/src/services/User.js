import axios from 'axios'

export const Logout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    localStorage.removeItem('avatar')
}

export const EditUser = async (values,user) => {
    await axios.patch(`/api/user/edit/${user.username}`,values,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res=>{
            console.log(res)
        },err=>{
            throw err
        })
}