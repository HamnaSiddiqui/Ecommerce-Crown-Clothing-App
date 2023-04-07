import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJa1w68cEPbDImBooCqCqoSUax1IbSlHM",
  authDomain: "crwn-clothing-33bb7.firebaseapp.com",
  projectId: "crwn-clothing-33bb7",
  storageBucket: "crwn-clothing-33bb7.appspot.com",
  messagingSenderId: "54851277450",
  appId: "1:54851277450:web:063f4698cf7b79ace15373"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
   additionalInformation = {}
  ) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log("Before If block")
  console.log('user snapshot',userSnapshot)
  console.log('user DocRef',userDocRef)
  console.log(userSnapshot.exists())


  if (!userSnapshot.exists()) {
    console.log("If block")
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
      console.log("User has been created ");
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}