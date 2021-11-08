import {Avatar, Menu} from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import {Logout} from './../../services/User'
const {Item} = Menu

export default function Nav() {
    let [current,setCurrent] = useState()
    let navigate = useNavigate()

    
    const handleClick = (e) => {
        console.log(e.key)
        setCurrent(e.key)
    }
    
    return (
        <Header>
        <div className="logo">
            <NavLink onClick={handleClick} key="/" to="/"><h1>BlogMan</h1></NavLink>           
        </div>
        {localStorage.getItem('userId')?
        <Menu theme="dark" onClick={handleClick} mode="horizontal" className="auth" selectedKeys={[current]}>
            <Item className="item" key="/blog/create/"><NavLink to="/blog/create/">New Blog</NavLink></Item>            
            <Menu.SubMenu key="sub" icon={<Avatar style={{border:"1px solid #f5f5f5"}} size="large" src={`/file/${localStorage.getItem('avatar')}`}/>}>
                <Item key="myprofile">
                <NavLink to={`/user/${localStorage.getItem('username')}`}>My Profile</NavLink>
                </Item>
                <Item key="/logout">
                    <NavLink to="" onClick={()=>{
                        Logout()
                        navigate("/")
                    }}>Log Out</NavLink>
                </Item>
            </Menu.SubMenu>
            
        </Menu>:
        <Menu theme="dark" onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="auth">
            <Item className="item" key="/login"><NavLink to="/login">Log In</NavLink></Item>
            <Item className="item" key="/signup"><NavLink to="/signup">Sign Up</NavLink></Item>
        </Menu>
        }
            
        </Header>
    )
}
