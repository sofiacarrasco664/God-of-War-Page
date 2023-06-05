<script setup>
import UserProfileDetails from "../components/UserProfileDetails.vue";
import LoadingContext from "../components/LoadingContext.vue";
import {useUserProfile} from "../composition/useUserProfile.js";


const {user, loading} = useUserProfile();


</script>

<template>
    <LoadingContext :loading="loading">
      <section>
        <h2 class="mb-3">Perfil de usuario</h2>
        <UserProfileDetails :user="user"></UserProfileDetails>
      </section>
      <router-link :to="`/usuario/${user.id}/chat`" class="btn btn-primary">Iniciar chat con {{ user.displayName || user.email }}</router-link>
    </LoadingContext>
</template>
