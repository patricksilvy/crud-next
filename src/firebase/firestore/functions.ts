import firebase_app from "../config"
import {
    getFirestore,
    doc,
    setDoc,
    PartialWithFieldValue,
    DocumentData,
    getDoc,
    collection as colectionFire,
    getDocs,
    deleteDoc,
} from "firebase/firestore"


const db = getFirestore(firebase_app)

interface addUserType {
    collection: string,
    id: string,
    data: PartialWithFieldValue<DocumentData>
}

interface getUserType {
    collection: string,
    id?: string,
}

interface deleteUserType {
    collection: string,
    id: string,
}

export async function addUser({ collection, id, data }: addUserType) {
    let result = null
    let error = null

    try {
        result = await setDoc(doc(db, collection, id), data, {
            merge: true,
        })
    } catch (e) {
        error = e
    }

    return { result, error }
}

export async function getUser({ collection, id }: getUserType) {
    if (id) {
        let result = null
        let error = null

        let docRef = doc(db, collection, id)

        try {
            const userSnapshot = await getDoc(docRef)
            const user = userSnapshot.data()
            result = user
        } catch (e) {
            error = e
        }

        return { result, error }
    } else {
        let docRef = colectionFire(db, collection)

        let result = null
        let error = null

        try {
            const usersSnapshot = await getDocs(docRef)
            const usersList = usersSnapshot.docs.map(doc => doc.data())
            result = usersList
        } catch (e) {
            error = e
        }

        return { result, error }
    }
}

export async function deleteUser({ collection, id }: deleteUserType) {
    let docRef = doc(db, collection, id)

    let result = null
    let error = null

    try {
        deleteDoc(docRef)
    } catch (e) {
        error = e
    }

    return { result, error }
}
