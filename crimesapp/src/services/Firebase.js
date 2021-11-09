import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { storageSave, storageRemove, storageGet } from './Storage'

const firebaseConfig = {
  apiKey: "AIzaSyCrPU5-oXCVw2jMMlweWcnQl_jrLlTcups",
  authDomain: "mapacrimes.firebaseapp.com",
  projectId: "mapacrimes",
  storageBucket: "mapacrimes.appspot.com",
  messagingSenderId: "860403545620",
  appId: "1:860403545620:web:543b317244114ff7641901"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth();


export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((usuario) => {
        storageSave("TOKEN_KEY", usuario.user.uid)
        resolve(true)
      })
      .catch((error) => {
        storageRemove("TOKEN_KEY")
        reject(error)
      })
  })
}


export const logoff = () => {
  return new Promise((resolve, reject) => {
    storageRemove("TOKEN_KEY")
    signOut(auth).then(() => {
      resolve()
    }).catch((error) => {
      reject()
    });
  })
}


export const isAuthenticated = () => storageGet("TOKEN_KEY") !== null;
export const getToken = () => storageGet("TOKEN_KEY")


