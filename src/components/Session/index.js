import React from 'react'
import { auth, signInWithGoogle,logout } from "../../firebase.js";

export default function Session(props) {


    return (
        <span>
            <button onClick={signInWithGoogle}>Login</button>
            <button onClick={logout}>Logout</button>
            <span>User:{auth.user ? auth.user.email : "is missing in session"}</span>
            <div>{auth.user  ? props.children : "child not rendered"}</div>
        </span>
    )
}