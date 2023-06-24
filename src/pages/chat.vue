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
        :options="chatsOptions"
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

    <div>
      <q-select
        name="role"
        label="Выбрать пользователя"
        v-model="userType"
        :options="usersOption"
      />

      <form @submit.prevent="submitChoice" action="">
        <button type="submit">Создать чат</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getUsers } from "../services/index";
import { getChatHistory } from "../services/index";

const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");
const roomId = ref(1);
const inputMsg = ref();
const userType = ref("");
const msgHistory = ref([]);
const usersOption = ref([]);
const chatsOptions = ref([{ label: "One", value: 1 }]);

let chatNubmer = ref(chatsOptions.value.length);

if (localStorage.getItem("userType") === "distributor") {
  getUsers("WirehouseOwner").then((res) => {
    res.forEach((el) => {
      usersOption.value.push({
        label: el.name_organisation,
        value: el.name_organisation,
      });
    });
  });
} else {
  getUsers("Distributor").then((res) => {
    res.forEach((el) => {
      usersOption.value.push({
        label: el.name_organisation,
        value: el.name_organisation,
      });
    });
  });
}

const submit = () => {
  socket.emit("postMsgOnServer", {
    message: inputMsg.value,
    roomId: roomId.value,
  });

  inputMsg.value = "";
};

const submitChoice = () => {
  chatNubmer.value++;
  chatsOptions.value.push({
    label: userType.value?.value,
    value: chatNubmer.value,
  });
  // socket.emit("postMsgOnServer", {
  //   message: inputMsg.value,
  //   roomId: roomId.value,
  // });
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

watch(roomId, () => {
  getChatHistory("room_" + roomId.value).then((res) => {
    console.log(res);
  });
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
