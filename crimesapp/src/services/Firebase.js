import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";


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
initializeApp(firebaseConfig);
const db = getFirestore();
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


export const saveCrimes = (crime) => {
  return new Promise(async (resolve, reject) => {
    try {
      await addDoc(collection(db, "crimes"), crime);
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export const deleteCrimes = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteDoc(doc(db, 'crimes', id));
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}


export const getCrimes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await getDocs(collection(db, "crimes"));
      let dados = []
      querySnapshot.forEach((doc) => {
        dados.push({
          id: doc.id,
          endereco: doc.data().endereco,
          descricao: doc.data().descricao
        })
      });
      resolve(dados)
    } catch (error) {
      reject(error)
    }
  })
}




export const isAuthenticated = () => storageGet("TOKEN_KEY") !== null;
export const getToken = () => storageGet("TOKEN_KEY")


