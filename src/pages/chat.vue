<template>
  <div>
    <div>
      <q-btn-toggle
        v-model="roomId"
        color="brown"
        text-color="white"
        toggle-color="orange"
        toggle-text-color="black"
        rounded
        unelevated
        glossy
        :options="[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' },
        ]"
      />
    </div>

    <div
      style="backgroun-color: red"
      class="q-pa-md flex justify-center column"
    >
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <q-chat-message
            v-for="(index, msg) in msgHistory[roomId]"
            :key="index"
            :name="msgHistory[roomId][msg].socketId"
            :text="[msgHistory[roomId][msg].message]"
          />
        </div>
      </div>

      <form @submit.prevent="submit" action="">
        <input class="formInput" v-model="inputMsg" type="text" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");
const roomId = ref("1");
const inputMsg = ref();

const msgHistory = ref([]);

const submit = () => {
  socket.emit("postMsgOnServer", {
    message: inputMsg.value,
    roomId: roomId.value,
  });

  inputMsg.value = "";
};

socket.on("message", (message) => {
  if (!msgHistory.value[message.roomId]) {
    msgHistory.value[message.roomId] = [message];
  } else {
    msgHistory.value[message.roomId].push(message);
  }
  console.log(msgHistory.value);
});

socket.on("connect", function () {
  console.log("Connected!");
});

// if (input.value) {
// 	socket.emit('message', input.value);
// 	input.value = '';
// }

socket.on("disconnect", function () {
  console.log("Disconnected!");
});
</script>

<style lang="scss" scoped>
.my-custom-toggle {
  border: 1px solid #027be3;
}
.formInput {
  width: 100%;
}
</style>
