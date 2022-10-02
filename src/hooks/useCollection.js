import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { db } from '../firebase/config'

export const useCollection = (c, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  const queryRef = useRef(_query).current
  const orderByRef = useRef(_orderBy).current

  useEffect(() => {
    let ref = collection(db, c)

    // if we don't use a ref --> infinite loop in useEffect
    // _query is an array and is "different" on every function call
    if (queryRef) {
      ref = query(ref, where(...queryRef))
    }

    if (orderByRef) {
      ref = query(ref, orderBy(...orderByRef))
    }

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })

        //update state
        setDocuments(results)
        setError(null)
      },
      (error) => {
        console.log(error)
        setError('Could not fetch the data')
      }
    )
    //unsubscribe on unmount
    return () => unsub()
  }, [c, queryRef, orderByRef])

  return { documents, error }
}
