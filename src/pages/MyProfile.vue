<script setup>
import {ref} from "vue";
import {updateUserProfile} from "../services/auth.js";
import AlertNotification from "../components/AlertNotification.vue";
import useAuth from "../composition/useAuth";
import useNotification from "../composition/useNotification";
import SubmitButton from "../components/SubmitButton.vue";
import UserProfileDetails from "../components/UserProfileDetails.vue";



const {form, status, loading, handleProfileUpdate, handleNotificationClose} = useProfileForm();
const {user} = useAuth();

function useProfileForm() {
  const form = ref({displayName: ''});
  const loading = ref(false);
  const {status, close} = useNotification();

  function handleProfileUpdate(){
    loading.value = true;
    updateUserProfile({
      displayName: form.value.displayName,
    })
        .then(() => {
          loading.value = false;
          status.value = {
            type: 'success',
            text: 'La información del perfil se actualizó correctamente.',
          }
        })
        .catch(err => {
          loading.value = false;
          status.value = {
            type: 'danger',
            text: err,
          };
        });
  }

  return {
    form,
    status,
    loading,
    handleProfileUpdate,
    handleNotificationClose: close,
  }

}

</script>

<template>
    <section>
        <h2 class="mb-3">Mi Perfil</h2>

      <AlertNotification
          v-if="status.text !== ''"
          :type="status.type"
          closable
          @close="handleNotificationClose"
      >
        {{ status.text }}
      </AlertNotification>

        <h3>Datos del usuario</h3>

      <UserProfileDetails :user="user"></UserProfileDetails>

        <hr>

      <section>
        <h2 class="mb-3">Actualizar mi perfil</h2>

        <form
            action="#"
            method="post"
            @submit.prevent="handleProfileUpdate"
        >
          <div class="mb-3">
            <label for="displayName" class="form-label">Nombre de usuario</label>
            <input
                type="text"
                id="displayName"
                class="form-control"
                :disabled="loading"
                v-model="form.displayName"
            >
          </div>
          <SubmitButton :loading="loading">Actualizar</SubmitButton>
        </form>
      </section>
</section>
</template>

<style>
    .avatar{
        width: 10%;
        object-fit: cover;
    }
</style>