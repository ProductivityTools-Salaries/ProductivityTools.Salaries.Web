import React from 'react'
import { useState, useEffect } from 'react'
import { AuthService } from '../../services/authService'

export default function Session(props) {


    let authService = new AuthService();

    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
        

    }, []);

    const getUser = () => {
        authService.getUser().then(user => {
            debugger;
            setUser(user);
        })
    }


    const login = () => {
        console.log("login");
        debugger;
        authService.login();
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