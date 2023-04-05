import {auth, googleProvider} from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import {useState} from "react"

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
        } catch (err) {
            console.log(err);
        }
    }

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.log(err);
        }
    }

    const logOut = async () => {
        try{
            await signOut(auth);
            setEmail("");
            setPassword("");
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div>
        <h2>Authentication</h2>
            <input type="email" placeholder="Email" autoComplete="off" onChange={(e) => {
                setEmail(e.target.value)
            }}></input>
            <input type="password" autoComplete="off" placeholder="Password" onChange={(e) => {
                setPassword(e.target.value)
            }}></input>
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}> G : Sign In with Google</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}