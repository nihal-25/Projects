import React, { useState, createContext, useEffect } from "react";
import { 
  signOut, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  getAuth,
  sendPasswordResetEmail,
  RecaptchaVerifier,
} from "firebase/auth";
import { loginRequest } from './authentication.service';
import { 
  getFirestore, 
  doc, 
  setDoc 
} from "firebase/firestore";
import { Alert } from "react-native";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [request,response, promptAsync]=Google.useAuthRequest({
        androidClientId:"55551343994-hbk48s7qv45ujdm0q6fpdt120cct560t.apps.googleusercontent.com",
        iosClientId:"55551343994-ip0t6m4ri4af85ktoetpg565pjp5e7m9.apps.googleusercontent.com",
    })

    const auth = getAuth();
    const firestore = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usr) => {
            if (usr) {
                setUser(usr);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const onLogin = (email, password) => {
        setIsLoading(true);
        loginRequest(email, password)
            .then((u) => {
                setUser(u);
                const userDocRef = doc(firestore, "users", u.uid);
                return setDoc(userDocRef, {
                    email: u.email,
                    lastLogin: new Date()
                }, { merge: true });
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.message);
            });
    };

    const onRegister = (email, password) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((u) => {
                setUser(u);
                const userDocRef = doc(firestore, "users", u.uid);
                return setDoc(userDocRef, {
                    email: u.email,
                    createdAt: new Date()
                });
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.message);
            });
    };
    

    const onLogout = () => {
        setIsLoading(true);
        console.log("Logging out...");
        signOut(auth)
            .then(() => {
                if (typeof setUser === "function") {
                    setUser(null);
                    console.log("User set to null");
                } else {
                    console.error("setUser is not a function");
                }
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.message);
                console.error("Error logging out:", e.message);
            });
    };

    const onResetPassword = (email) => {
        setIsLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false);
                Alert.alert("Success", "Password reset email sent!");
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.message);
                Alert.alert("Error", e.message);
            });
    };
    const sendOtpToPhone = (phoneNumber, recaptchaVerifier) => {
        setIsLoading(true);
        signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
            .then((confirmationResult) => {
                setIsLoading(false);
                Alert.alert("Success", "OTP sent to phone number!");
                // Store confirmationResult for verifying the OTP
                return confirmationResult;
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.message);
                Alert.alert("Error", e.message);
            });
    };
    const verifyOtp = (confirmationResult, otp) => {
        setIsLoading(true);
        confirmationResult.confirm(otp)
            .then((result) => {
                setIsLoading(false);
                setUser(result.user);
                Alert.alert("Success", "OTP verified!");
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.message);
                Alert.alert("Error", e.message);
            });
    };

    return (
        <AuthenticationContext.Provider
            value={{
                user,
                isLoading,
                error,
                onLogin,
                onRegister,
                onLogout,
                onResetPassword,
                setUser,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
