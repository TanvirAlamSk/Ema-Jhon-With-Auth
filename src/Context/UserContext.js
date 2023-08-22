import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import app from '../Firebase/Fitrbase.config';

export const AuthContext = createContext()
const auth = getAuth(app);
const UserContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    const googleProvider = new GoogleAuthProvider()


    const signupEmailAndPassword = (name, email, password) => {
        setLoader(true)
        createUserWithEmailAndPassword(auth, email, password).then((userCradential) => {
            updateProfile(auth.currentUser, {
                displayName: name
            })
            alert("signup successful")
        }).catch((error) => {
            alert(error)
        })
    }
    //
    const googleSignup = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            const currentUser = result.user;
            alert("SignUp by Google successful");
        }).catch((error) => {
            alert(error);
        })
    }

    //
    const loginEmailandPassword = (email, password) => {
        setLoader(true)
        signInWithEmailAndPassword(auth, email, password).then((userCradential) => {
            alert("Login Successful");
        }).catch((error) => {
            alert(error)
        })
    }

    //

    const logout = () => {
        setLoader(true)
        signOut(auth).then(() => {
            alert("Logout Successful")
        }).catch((error) => {
            alert(error)
        })
    }

    //

    useEffect(() => {
        const unsubscriber = () => {
            onAuthStateChanged(auth, (user) => {
                setUser(user);
                setLoader(false)
            })
        }
        return () => {
            unsubscriber();
        }

    }, [])



    const authinfo = {
        user,
        loader,
        signupEmailAndPassword,
        loginEmailandPassword,
        logout,
        googleSignup
    }
    return (
        <div>
            <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
        </div>
    );
};

export default UserContext;