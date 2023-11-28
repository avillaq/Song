
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

// Firestore (Database)
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js'

// Authentication
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// Configuraciones de firebase
import { firebaseConfig }from './config/config.js';


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore (Database)
const db = getFirestore(app);

// Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Documentacion: https://firebase.google.com/docs/firestore/manage-data/add-data



////////////// Authentication //////////////

// Login with Google
export const loginWithGoogle = async () => {
    await signInWithRedirect(auth, provider)
}

export const getAuthFirebase = () => {
    return auth;
}



////////////// CRUD (database) //////////////

// CREATE
export const createLyrics = async (name, author, lyrics, userid) => {
    await addDoc(collection(db, "lyrics"), {
        name,
        author,
        lyrics,
        userid
    });
}

// READ ALL
export const readAllLyrics = async (userid) => {
    const querySnapshot = await getDocs(collection(db, "lyrics"));
    const lyrics = [];
    querySnapshot.forEach((doc) => {
        if (doc.data().userid == userid) {
            lyrics.push({
                id: doc.id,
                ...doc.data()
            })
        }
    });
    return lyrics;
}

// READ ONE
export const readOneLyrics = async (id) => {
    const docRef = doc(db, "lyrics", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {
            id: docSnap.id,
            ...docSnap.data()
        }
    } else {
        console.log("No such document!");
        return null;
    }
}

// UPDATE
export const updateLyrics = async (id, name, author, lyrics) => {
    const docRef = doc(db, "lyrics", id);
    await updateDoc(docRef, {
        name,
        author,
        lyrics
    });
}

// DELETE
export const deleteLyrics = async (id) => {
    const docRef = doc(db, "lyrics", id);
    await deleteDoc(docRef);
}








