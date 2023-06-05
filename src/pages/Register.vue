<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {AUTH_ERROR_MESSAGES, register} from "../services/auth.js";
import AlertNotification from "../components/AlertNotification.vue";
import useNotification from "../composition/useNotification.js";
import SubmitButton from "../components/SubmitButton.vue";

const router = useRouter();
const {
  form,
  status,
  loading,
  handleRegister
} = useRegisterForm();

function useRegisterForm() {
  const form = ref({
    email: '',
    password: '',
  });
  const loading = ref(false);
  const {status} = useNotification();

  function handleRegister() {

    loading.value = true;

    register({...form.value})
        .then(() => {
          loading.value = true;
          status.value = {
            text: 'Se ha creado su cuenta correctamente',
            type: 'success',
          }
          router.push('/perfil');
        })
        .catch(err => {
          loading.value = true;
          status.value = {
            type: 'danger',
            text: AUTH_ERROR_MESSAGES[err.code] || err.code,
          }
        });
  }

  return {
    form,
    status,
    loading,
    handleRegister,
  }

}

</script>

<template>
    <section>
        <h2 class="mb-3">Crear una cuenta </h2>
        <AlertNotification
            v-if="status.text !== ''"
            :type="status.type"
        >
          {{ status.text }}
        </AlertNotification>

        <form
            action="#"
            method="post"
            @submit.prevent="handleRegister"
        >
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input 
                type="email" 
                name="email" 
                id="email" 
                class="form-control" 
                placeholder="minimo 6 caracteres"
                :disabled="loading"
                v-model="form.email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    :disabled="loading"
                    v-model="form.password"
                >
            </div>
          <SubmitButton :loading="loading">Crear Cuenta</SubmitButton>
        </form>
    </section>
</template>
