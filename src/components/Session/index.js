import React from 'react'
import { useState, useEffect,useRef } from 'react'
import { AuthService } from '../../services/authService'

export default function Session(props) {


    let authService = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        authService.current = new AuthService();
        console.log("use effect")
        authService.current.getUser().then(user => {
            console.log("getuser")
            setUser(user);
            setMounted(true);
        })
    }, [setUser, authService, mounted]);



    const login = () => {
        console.log("login");
        debugger;
        authService.current.login();
    }

    const logout = () => {
        authService.logout();
    }

    return (
        <span>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
            <span>User:{user ? user.profile.sid : "is missing in session"}</span>
            <div>{user ? props.children : "child not rendered"}</div>
        </span>
    )
}