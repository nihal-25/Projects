  //ios 55551343994-ip0t6m4ri4af85ktoetpg565pjp5e7m9.apps.googleusercontent.com
  //android 55551343994-hbk48s7qv45ujdm0q6fpdt120cct560t.apps.googleusercontent.com
  import "react-native-gesture-handler";
  import React from "react";
  import { Provider as PaperProvider } from "react-native-paper";
  import { initializeApp, getApps, getApp } from "firebase/app";
  import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";
  import { CartProvider } from "./src/context/CartContext";
  import { AuthenticationContextProvider } from "./src/service/authentication.context";
  import { Navigation } from "./src/navigation";
  import AsyncStorage from '@react-native-async-storage/async-storage';




  const firebaseConfig = {
    apiKey: "AIzaSyABcdxNFpCGpnYGs7OlOBRLMHYpvLRlDVs",
  authDomain: "vk-1-73a46.firebaseapp.com",
  projectId: "vk-1-73a46",
  storageBucket: "vk-1-73a46.appspot.com",
  messagingSenderId: "1023681488676",
  appId: "1:1023681488676:web:ce0aec35949ee092fd35b1"
  };


  let app;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }


  let auth;
  try {
    auth = getAuth(app);
  } catch (error) {
    if (error.code === 'auth/already-initialized') {
      auth = getAuth();
    } else {
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
      });
    }
  }


  const firestore = getFirestore(app);

  const App = () => {
    return (
      <PaperProvider>
        <CartProvider>
          <AuthenticationContextProvider>
            <Navigation/>
          </AuthenticationContextProvider>
        </CartProvider>
      </PaperProvider>
    );
  };

  export default App;
