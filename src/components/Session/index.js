import React from 'react'
import { AuthService } from '../../services/authService'

export default function Session(){


    let authService=new AuthService();

    const login=()=>{
        console.log("login");
        debugger;
        authService.login();
    }

    const logout=()=>{
        authService.logout();
    }

    return(
        <span>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
        </span>
    )
}