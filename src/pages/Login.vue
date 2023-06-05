<script setup>
import {AUTH_ERROR_MESSAGES, login} from "../services/auth.js";
import {useRouter} from 'vue-router';
import AlertNotification from "../components/AlertNotification.vue";
import {ref} from "vue";
import useNotification from "../composition/useNotification";

const router = useRouter();
const {user, status, handleSubmit} = useLoginForm();


function useLoginForm() {
  const user = ref({
    email: '',
    password: '',
  });
  const {status} = useNotification();

  function handleSubmit() {
    login({...user.value})
        .then(() => {
          status.value = {
            type: 'success',
            text: 'Sesión iniciada',
          }
          router.push('/perfil');
        })
        .catch(err => {

          status.value = {
            type: 'danger',
            text: AUTH_ERROR_MESSAGES[err.code] || err.code,
          };
        });
  }

  return {
    user,
    status,
    handleSubmit,
  }
}

</script>

<template>
    <section>
        <h1 class="mb-3">Iniciar Sesión</h1>
        <AlertNotification
            v-if="status.text !== ''"
            :type="status.type"
        >
          {{ status.text }}
        </AlertNotification>

        <form
            action="#"
            method="post"
            @submit.prevent="handleSubmit"
        >
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    class="form-control"
                    v-model="user.email"
                >
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    v-model="user.password"
                >
            </div>
            <button type="submit" class="btn btn-primary w-100">Ingresar</button>
        </form>
    </section>
</template>
