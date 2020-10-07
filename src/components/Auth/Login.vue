<template>
  <form @submit.prevent="submitForm" class="login-form">
    <h2 class="form-title">Login</h2>
    <input type="text" v-model="mail" placeholder="Enter your E-mail">
    <input type="text" v-model="password" placeholder="Enter password">
    <input type="text" v-model="passwordRepeated" placeholder="Repeat password">
    <button class="login-form__submit">Login</button>
  </form>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'
export default defineComponent({
  setup() {
    const mail = ref('')
    const password = ref('')
    const passwordRepeated = ref('')

    const submitForm = () => {}

    return {
      submitForm,
      mail,
      password,
      passwordRepeated
    }
  }
})
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    color: #fafafa;
    font-size: 1rem;
    padding: .3rem;
    background: none;
    border: none;
    border-bottom: 1px solid #fafafa;
    outline: none;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  &__submit {
    margin-top: 2rem;
    background-color: #bdbdbd;
    border: none;
    color: #fafafa;
    font-weight: 600;
    border-radius: 5px;
    padding: .3rem 1.5rem;
  }
}

.form-title {
  color: #fafafa;
  margin-bottom: 1.5rem;
  font-weight: 400;
}
</style>
