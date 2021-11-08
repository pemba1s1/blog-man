import { useLocation,Navigate } from "react-router"

export const PrivateRoute = ({children}) => {
    let location = useLocation()
    if(localStorage.getItem('token')){
        return children;
    }else{
        return <Navigate to='/login' state={{from:location}} />
    }
}
