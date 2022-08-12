import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCN_tcuvA1KbFOK3tjkhj5Vz_qm5Vzuuqk',

  authDomain: 'blog-world-6923d.firebaseapp.com',

  projectId: 'blog-world-6923d',

  storageBucket: 'blog-world-6923d.appspot.com',

  messagingSenderId: '607249845207',

  appId: '1:607249845207:web:99e0397bcfa5b2ab7b9992',
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)

export const db = getFirestore(app)

export const auth = getAuth(app)
