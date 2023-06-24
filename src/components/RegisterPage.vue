<template>
  <q-page class="q-pa-md flex flex-center">
    <div>
      <h5>Регистрация</h5>
      <q-form @submit.prevent="registerSubmit" @reset="RegisterReset">
        <q-input
          rounded
          v-model="form.name"
          label="Введите ваше имя"
          type="text"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите что нибудь']"
        >
        </q-input>
        <q-input
          rounded
          v-model="form.password"
          label="Введите ваш пароль"
          type="text"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите что нибудь']"
        >
        </q-input>
        <q-input
          rounded
          v-model="form.email"
          label="Введите вашу почту"
          type="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите что нибудь']"
        >
        </q-input>

        <q-select
          name="role"
          label="Роль пользователя"
          v-model="form.userType"
          :options="roleOptions"
        />

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
          Уже есть аккаунт? <router-link to="/Enter">Войдите</router-link>
        </p>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { createUser } from "../services/index";

export default defineComponent({
  setup() {
    const email = ref("");
    const password = ref("");
    const password_repeat = ref("");
    const code = ref("");
    const name = ref("");
    const surname = ref("");
    const $router = useRouter();

    const form = ref({
      name: "",
      email: "",
      userType: { label: "distributor", value: "distributor" },
      password: "",
    });

    const roleOptions = ref([
      { label: "distributor", value: "distributor" },
      { label: "wirehouse_owner", value: "wirehouse_owner" },
    ]);

    const registerSubmit = () => {
      try {
        createUser(
          {
            name: form.value.name,
            email: form.value.email,
            userType: form.value.userType.value,
            password: form.value.password,
          },
          "signUp"
        );
      } catch (err) {
        console.log(err);
      }
    };

    return {
      form,
      registerSubmit,
      roleOptions,
    };
  },
});
</script>
