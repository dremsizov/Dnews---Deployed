import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function GuestGuard(){

    const{ auth } = useContext(AuthContext);
    if(auth) {

        return <Navigate to='/' />
    }

    return  <Outlet />
        
    
}