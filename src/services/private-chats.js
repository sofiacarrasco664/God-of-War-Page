import {
    getFirestore,
    doc,
    addDoc,
    collection,
    serverTimestamp,
    query,
    where,
    limit,
    getDoc,
    getDocs,
    orderBy,
    onSnapshot
} from "firebase/firestore";

const db = getFirestore();

/**
 *
 * @param {string} from
 * @param {string} to
 * @returns {Promise<DocumentReference<{users: {} | {}}>|QueryDocumentSnapshot<DocumentData>>}
 */
async function getPrivateChatRef({from, to}) {

    const queryChat = query(
        collection(db, 'private-chats'),
        where('users', '==', {
            [from] : true,
            [to] : true,
        }),
        limit(1),
    );

    const querySnap = await getDocs(queryChat);

    if(querySnap.empty) {
        return await addDoc(collection(db, 'private-chats'), {
            users: {
                [from]: true,
                [to]: true,
            },
        });
    } else {
        return querySnap.docs[0];
    }
}

/**
 *
 * @param {string}  from
 * @param {string} to
 * @param {string} text
 * @returns {Promise<DocumentReference<DocumentData>>}
 */
export async function sendPrivateMessage({from, to, text}) {
    const chatRef = await getPrivateChatRef({from, to});
    return addDoc(collection(db, 'private-chats', chatRef.id, 'messages'), {
        from,
        text,
        created_at: serverTimestamp(),
    });
}

/**
 *
 * @param {string} from
 * @param {string} to
 * @param {(newMessages: array) => unknown } callback
 * @returns {Promise<Unsubscribe>}
 */
export async function subscribeToPrivateChat({from, to}, callback) {
    const chatRef = await getPrivateChatRef({from, to});
    const queryRef = query(
        collection(db, 'private-chats', chatRef.id, 'messages'),
        orderBy('created_at'),
    );
    return onSnapshot(queryRef, snapshot => {
        const data = snapshot.docs.map(item => {
            return {
                from: item.data().from,
                text: item.data().text,
                created_at: item.data().created_at?.toDate(),
            }
        });
        callback(data);
    });
}