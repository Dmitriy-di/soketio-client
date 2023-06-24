<template>
  <q-page class="q-pa-md flex flex-center">
    <div>
      <h5>Вход</h5>
      <q-form @submit="EnterSubmit" @reset="EnterReset">
        <q-input
          rounded
          v-model="email"
          label="Введите вашу почту"
          type="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите что нибудь']"
        >
        </q-input>
        <q-input
          rounded
          v-model="password"
          label="Введите ваш пароль"
          type="password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите что нибудь']"
        >
        </q-input>
        <p class="error" v-if="error">{{ error }}</p>
        <div class="q-mt-md">
          <q-btn label="Отправить" type="submit" color="primary" />
          <q-btn
            label="Сбросить"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
        <p class="q-pt-md">
          Не зарегистрированы?
          <router-link to="/">Зарегистрируйтесь</router-link>
        </p>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
// import { enter } from "../services/enter";

export default defineComponent({
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref("");

    const EnterReset = () => {
      email.value = "";
      password.value = "";
    };

    const EnterSubmit = async () => {
      console.log("email", email.value);
      console.log("password", password.value);

      let resAuth = null;

      enter({
        email: email.value,
        password: password.value,
      })
        .then((res) => {
          resAuth = res;

          console.log(111, resAuth);

          localStorage.setItem("token", resAuth.accessToken);
          localStorage.setItem("moderator", resAuth.moderator);

          EnterReset();
          router.push("/app");
        })
        .catch((err) => {
          console.log("Ошибка: ", err);
          error.value = "Неверный логин или пароль";
        });
    };

    return {
      EnterSubmit,
      email,
      password,
      error,
      EnterReset,
    };
  },
});
</script>
