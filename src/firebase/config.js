import { initializeApp } from 'firebase/app'
import { getFirestore, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

//your firebase api key here

//init firebase
initializeApp(firebaseConfig)

//init services
const db = getFirestore()
const auth = getAuth()

const timestamp = Timestamp

export { db, auth, timestamp }
