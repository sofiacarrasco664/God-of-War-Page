import {onSnapshot, collection} from "firebase/firestore";
import {db} from './firestore';

export const obtenerServicios = (callback) => {
    const coleccion = collection(db, 'servicios');
    onSnapshot(collection, datos => {
        
    })
}