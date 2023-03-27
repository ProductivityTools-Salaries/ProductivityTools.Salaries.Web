import React, { useEffect } from 'react'
import { auth, signInWithGoogle,logout } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";


export default function Session(props) {

    const [user,loading]=useAuthState(auth);
    useEffect(()=>{
        console.log("not sure");
    },[user,loading])

    const login=()=>{
        signInWithGoogle();
        debugger;
    }

    return (
        <span>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
            <span>version2.0</span>
            <span>User:{auth?.currentUser ? auth?.currentUser?.displayName : "is missing in session"}</span>
            <span>{auth?.currentUser?.email}</span>
            <div>{auth?.currentUser  ? props.children : "child not rendered"}</div>
        </span>
    )
}