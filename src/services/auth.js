import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import {createUserProfile, updateUserProfile as updateUserProfileInDatabase} from "./user-profiles.js";


const auth = getAuth();

let userData = {
    id: null,
    email: null,
    displayName: null,
}

if (localStorage.getItem('user') !== null) {
    userData = JSON.parse(localStorage.getItem('user'));
}
onAuthStateChanged(auth, user => {

    if (user) {
        userData = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
        }
        localStorage.setItem('user', JSON.stringify(userData));
    } else {
        userData = {
            id: null,
            email: null,
            displayName: null,
        }
        localStorage.removeItem('user');
    }

    notifyAll();
});


export const AUTH_ERROR_MESSAGES = {
    'auth/wrong-password': 'Password incorrecto',
    'auth/internal-error': 'Complete los datos',
    'auth/invalid-email': 'Email invalido',
}

export function login({ email, password }) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            console.log("el usuario es ", user);
        })
}
export function logout() {
    return signOut(auth);
}

export async function register({ email, password }) {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);

    return createUserProfile(user.uid, {
        email,
    });
}

export async function updateUserProfile({ displayName }) {
    const authPromise = updateProfile(auth.currentUser, {
            displayName,
    });
    const profilePromise = updateUserProfileInDatabase(userData.id, {
        displayName,
    });

    await Promise.all([authPromise, profilePromise]);

    userData = {
        ...userData,
        displayName,
    }
    notifyAll();
}
// Observers

let observers = [];

export function subscribeToAuthChanges(callback) {

    observers.push(callback);
    notify(callback);

    return () => {
        observers = observers.filter(observerCallback => observerCallback !== callback);
    }
}

function notify(callback) {
    callback({...userData });
}


function notifyAll() {
    observers.forEach(callback => notify(callback));
}