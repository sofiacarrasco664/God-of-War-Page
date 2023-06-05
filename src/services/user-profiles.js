import  {
    getFirestore,
    setDoc,
    doc,
    updateDoc,
    getDoc,
} from "firebase/firestore";

const db = getFirestore();


/**
 *
 * @param {string} id
 * @param {string|null} email
 * @param {string|null} displayName
 * @param {string|null} photoURL
 * @returns {Promise<void>}
 */

export function createUserProfile(id, {email, displayName = null, photoURL = null}) {
    return setDoc(doc( db, 'users', id), {
        email,
        displayName,
        photoURL,
    });
}

/**
 *
 * @param {string} id
 * @param {string|null} displayName
 * @param {string|null} photoURL
 * @returns {Promise<void>}
 */

export function updateUserProfile(id, {displayName = null, photoURL = null}) {
    return updateDoc(doc( db, 'users', id), {
        displayName,
        photoURL,
    });
}

/**
 *
 * @param {string} id
 * @returns {Promise<{displayName: string, photoURL: string, email: string, id: string}>}
 */

export async function getUserProfile(id) {
    const userData = await getDoc(doc(db, `users/${id}`));
    return {
        id,
        ...userData.data(),
    }
}