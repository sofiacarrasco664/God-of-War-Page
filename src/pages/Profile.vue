<script>
import {updateUserProfile, subscribeToAuthChanges} from "../services/auth.js";
export default {
    name: "Profile",
    
    data: () => ({
        form: {
            displayName: '',
        },
        user: {
            id: null,
            email: null,
            displayName: null,
        },
        unsubscribeFunction: () => {},
        
    }),
    methods: {
        handleProfileUpdate(){
            updateUserProfile({
                displayName: this.form.displayName,
            }) 
            
        }
        
    },
    mounted() {
        this.unsubscribeFunction = subscribeToAuthChanges(newUserData => this.user = newUserData);
        this.form.displayName = this.user.displayName;
    },
    unmounted() {
        this.unsubscribeFunction();
    }

}
</script>

<template>
    <section>
        <h2 class="mb-3">Perfil de usuario</h2>
        <dl class="mb-3">
            <dt>Email</dt>
            <dd>{{ user.email }}</dd>
            <dt>Usuario</dt>
            <dd>
                <template v-if="user.displayName">
                    <h3>{{ user.displayName }}</h3>
                        <img class="avatar"
                        src="https://cdn-icons-png.flaticon.com/512/147/147133.png" 
                        :alt="'{{user.displayNam}}'"
                        />
                </template>
                <template v-else>
                    <p class="text-primary">Sin datos</p>
                </template>
            </dd>
        </dl>


    <div>
        <h2 class="mb-3">Actualizar mi perfil</h2>

        <form action="#" method="post" @submit.prevent="handleProfileUpdate">
            <div class="mb-3">
                <label for="displayName" class="form-label">Nombre de usuario</label>
                <input type="text" id="displayName" class="form-control" v-model="form.displayName">
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
    </div>
</section>
</template>

<style>
    .avatar{
        width: 10%;
        object-fit: cover;
    }
</style>