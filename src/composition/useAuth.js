import {onMounted, onUnmounted, ref} from "vue";
import {subscribeToAuthChanges} from "../services/auth";

export default function useAuth() {
    const user = ref({
        id: null,
        email: null,
        displayName: null,
    });

    let unsubscribe;

    onMounted( () => {
        unsubscribe = subscribeToAuthChanges(newUserData => user.value = newUserData);
    });

    onUnmounted(() => {
        unsubscribe();
    });

    return {
        user,
    }
}
