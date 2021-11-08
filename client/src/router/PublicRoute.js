import { useLocation,Navigate } from "react-router"

export const PublicRoute = ({children}) => {
    let location = useLocation()
    if(!localStorage.getItem('token')){
        return children;
    }else{
        return <Navigate to='/' state={{from:location}} />
    }
}
