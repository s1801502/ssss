import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDsaEC6hAJxecaUeSCkir7S5tf7KK90spE",
    authDomain: "crown-db777.firebaseapp.com",
    databaseURL: "https://crown-db777.firebaseio.com",
    projectId: "crown-db777",
    storageBucket: "",
    messagingSenderId: "300593719921",
    appId: "1:300593719921:web:8b70d378be09e09c"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()

    if (!snapshot.exists) {
      const {displayName, email} = userAuth
      const createdAt = new Date()

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      } catch (error) {
        console.log('error', error.message)
      }
    }

    return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account'})

  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase