<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import useAuth from "../composition/useAuth.js";
import {useUserProfile} from "../composition/useUserProfile.js";
import {sendPrivateMessage, subscribeToPrivateChat} from "../services/private-chats.js";
import {useRoute} from "vue-router";
import {dateToString} from "../helpers/date.js";
import LoadingContext from "../components/LoadingContext.vue";

const {
    user,
    chattingUser,
    loading,
    message: formMessage,
    handleSubmit,
} = usePrivateChatForm();

const {messages} = usePrivateChat();

function usePrivateChatForm() {
  const {user} = useAuth();
  const {user: chattingUser, loading} = useUserProfile();
  const message = ref('');

  function handleSubmit() {
    sendPrivateMessage( {
      from: user.value.id,
      to: chattingUser.value.id,
      text: message.value,
    });
    message.value = '';
  }

  return {
    user,
    chattingUser,
    message,
    loading,
    handleSubmit,
  }
}

function usePrivateChat() {
  const messages = ref([]);
  const {user} = useAuth();
  const route = useRoute();
  let unsubscribe;

  onMounted(async () => {
    unsubscribe = await subscribeToPrivateChat({
      from: user.value.id,
      to: route.params.id,
    }, newMessages => messages.value = newMessages);
  });

  onUnmounted(() => {
    if(typeof unsubscribe !== 'function') return;
    unsubscribe();
  });
  return {
    messages,
  }
}

</script>

<template>

  <section>
    <LoadingContext :loading="loading">
      <h1 class="mb-3">Chat privado con {{ chattingUser.displayName || chattingUser.email }}</h1>
      <h2 class="visually-hidden">Mensajes</h2>

      <div class="chat mb-3">
        <ul>
          <li
              v-for="message in messages"
              :key="message.created_at"
          >
            <b>
              ({{ dateToString(message.created_at) }})
              {{
                message.from === user.id ?
                    user.displayName || user.email :
                    chattingUser.displayName || chattingUser.email
              }}
              dijo
            </b>:
            <div>{{ message.text }}</div>
          </li>
        </ul>
      </div>

      <h2 class="visually-hidden">Enviar mensaje</h2>
      <form
          action="#"
          method="post"
          @submit.prevent="handleSubmit"
      >
        <label for="message" class="visually-hidden">Mensajes</label>
        <textarea
            id="message"
            class="form-control"
            v-model="formMessage"
            style="resize: none"
        ></textarea>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
    </LoadingContext>
  </section>

</template>
