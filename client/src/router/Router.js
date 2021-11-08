import { Routes,Route } from "react-router-dom"
import CreateBlog from "../components/Blog/CreateBlog"
import EditBlog from "../components/Blog/EditBlog"
import ReadBlog from "../components/Blog/ReadBlog"
import Home from "../components/Home"
import Login from "../components/login"
import Signup from "../components/signup"
import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"
import NotFound from "../components/404"
import Profile from "../components/profile/Profile"
import EditProfile from "../components/profile/EditProfile"

export const Router = () => {   
    return(
        <Routes>
            <Route path="/" element={<Home />}/>            
            <Route path="/login" element={
            <PublicRoute>
            <Login />
            </PublicRoute>
            } />            
            <Route path="/signup" element={
            <PublicRoute>
            <Signup />
            </PublicRoute>}/>            
            <Route path="blog/:id" element={<ReadBlog />}/>
            <Route path="/blog/create" element={
            <PrivateRoute >
            <CreateBlog />
            </PrivateRoute>
            }/>
            <Route path="/blog/update/:id" element={
            <PrivateRoute>
            <EditBlog/>
            </PrivateRoute>
            }/>
            <Route path="/user/:username" element={<Profile/>}/>
            <Route path="/user/edit/:username" element={
            <PrivateRoute>
            <EditProfile/>
            </PrivateRoute>
            }/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
    
}