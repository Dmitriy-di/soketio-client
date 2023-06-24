<template>
  <div>
    <h4>Пользователей онлайн: {{ usersOnline }}</h4>
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
        :options="roomsOptions"
      />
    </div>

    <div
      style="backgroun-color: red"
      class="q-pa-md flex justify-center column"
    >
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <!-- <div v-for="msg in msgHistory" :key="msg.id">
            {{ msg.Distributor }}
          </div> -->

          <q-chat-message
            v-for="(msg, index) in msgHistory"
            :key="index"
            :name="
              msg.Distributor
                ? msg.Distributor?.name_organisation
                : msg.Wirehouse_owner?.name_organisation
            "
            :text="[msg.message]"
            :sent="msg[userType]?.email == userEmail"
          />
        </div>
      </div>

      <form @submit.prevent="submit" action="">
        <input
          class="formInput"
          v-model="inputMsg"
          type="text"
          placeholder="Введите сообщение"
        />
      </form>
    </div>

    <div>
      <!-- <q-select
        name="role"
        label="Выбрать пользователя"
        v-model="userType"
        :options="usersOption"
      /> -->

      <form @submit.prevent="createChat" action="">
        <input
          class="formInput"
          v-model="nameNewChat"
          type="text"
          placeholder="Новый чат"
        />
        <!-- <button type="submit">Создать чат</button> -->
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getUsers } from "../services/index";
import { getRoom, getRooms } from "../services/index";

const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");
const roomId = ref(1);
const inputMsg = ref();
const userType = ref(localStorage.getItem("userRole"));
const msgHistory = ref([]);
const usersOption = ref([]);
const roomsOptions = ref([]);
const nameNewChat = ref();
const userEmail = ref(localStorage.getItem("email"));
let usersOnline = ref(0);
let chatNubmer = ref();

// if (localStorage.getItem("userType") === "distributor") {
//   getUsers("WirehouseOwner").then((res) => {
//     res.forEach((el) => {
//       usersOption.value.push({
//         label: el.name_organisation,
//         value: el.name_organisation,
//       });
//     });
//   });
// } else {
//   getUsers("Distributor").then((res) => {
//     res.forEach((el) => {
//       usersOption.value.push({
//         label: el.name_organisation,
//         value: el.name_organisation,
//       });
//     });
//   });
// }

const submit = () => {
  const choicedRoom = roomsOptions.value.filter(
    (el) => el.value == roomId.value
  );
  const msg = {
    message: inputMsg.value,
    roomName: choicedRoom[0].label,
    roomId: choicedRoom[0].value,
    userRole: localStorage.getItem("userRole"),
    userId: localStorage.getItem("userId"),
  };
  console.log(msg);
  // TODO доделать!!
  socket.emit("postMsgOnServer", msg);

  inputMsg.value = "";
};

getRooms().then((rooms) => {
  console.log("rooms", rooms);
  rooms.forEach((el) =>
    roomsOptions.value.push({
      label: el.name,
      value: el.id,
    })
  );
  chatNubmer.value = roomsOptions.value.length;
});

const createChat = () => {
  chatNubmer.value++;
  // roomsOptions.value.push({
  //   label: userType.value?.value,
  //   value: chatNubmer.value,
  // });
  socket.emit("createChat", nameNewChat.value);
  nameNewChat.value = "";
  // socket.emit("postMsgOnServer", {
  //   message: inputMsg.value,
  //   roomId: roomId.value,
  // });
};

socket.on("message", (message) => {
  console.log("msgHistory", msgHistory.value);
  console.log("message", message);
  msgHistory.value.push(message);
});

socket.on("connect", function () {
  console.log("Connected!");
});

socket.on("chatHistories", (cHistory) => {
  console.log("cHistory", cHistory);
  msgHistory.value = cHistory;
});

socket.on("setNewRoom", (room) => {
  roomsOptions.value.push({
    label: room.name,
    value: room.id,
  });
});

// if (input.value) {
// 	socket.emit('message', input.value);
// 	input.value = '';
// }

socket.on("disconnect", function () {
  console.log("Disconnected!");
});

socket.on("countUsersOnline", (countUsersOnline) => {
  usersOnline.value = countUsersOnline / 2;
});

watch(roomId, () => {
  const choicedRoom = roomsOptions.value.filter(
    (el) => el.value == roomId.value
  );
  socket.emit("joinRoom", {
    roomName: choicedRoom[0].label,
    roomId: choicedRoom[0].value,
  });
  console.log("roomName", choicedRoom[0].label);
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
