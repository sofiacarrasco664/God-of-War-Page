<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {saveChatMessage, subscribeToChatMessages} from "../chat/chat.js";
import {dateToString} from "../helpers/date.js";
import LoadingContext from "../components/LoadingContext.vue";
import useAuth from "../composition/useAuth";
import ChatMessageUser from "../components/ChatMessageUser.vue";

const {messages, messagesLoaded} = useChat();
const {newMessage, save} = useChatForm();
const {user} = useAuth();

function useChat() {
  const messages = ref([]);
  const messagesLoaded = ref(false);


  let unsubscribe;

  onMounted(() => {
    unsubscribe = subscribeToChatMessages( newMessages => {
      messages.value = newMessages;
      messagesLoaded.value = true;
    });
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return {
    messages,
    messagesLoaded,
  }

}

function useChatForm() {
  const newMessage = ref({
    text: '',
  });

  function save() {

    saveChatMessage({
      ...newMessage.value,
      name: user.value.displayName || user.value.email,
      userId: user.value.id,
    });
    newMessage.value.text = "";
  }
  return {
    newMessage,
    save,
  }
}

</script>

<template>
    <section>
        <h1 class="mb-3">Chateá con nosotros</h1>

        <div class="row">
            <div class="col-8">
                <h2>Sala de Chat</h2>
                <div id="messages">
                    <LoadingContext :loading="!messagesLoaded">
                        <ul>
                            <li
                                v-for="message in messages"
                                :key="message.id"
                            >
                                <b>
                                  ({{ dateToString(message.created_at) }})
                                  <ChatMessageUser
                                    :message="message"
                                    :show-link="message.userId !== user.id"
                                  ></ChatMessageUser>
                                  dijo
                                </b>: {{ message.text }}
                            </li>
                        </ul>
                    </LoadingContext>
                  
                </div>
            </div>
            <div class="col-4">
                <h2>Enviá un mensaje</h2>
                <form
                    action="#"
                    method="post"
                    id="form-chat"
                    @submit.prevent="save"
                >
                    <div class="mb-3">
                        <h3>Nombre</h3>
                        <p>{{user.displayName || user.email}}</p>
                    </div>
                    <div class="mb-3">
                        <label for="text" class="form-label">Mensaje</label>
                        <textarea
                            id="text"
                            class="form-control"
                            v-model="newMessage.text"
                            style="resize: none;"
                        ></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>
        </div>
    </section>
</template>
