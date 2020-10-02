<template>
  <form @submit.prevent="submitForm" class="login-form">
    <h2 class="form-title">Login</h2>
    <input type="text" v-model="mail" placeholder="Enter your E-mail">
    <input type="text" v-model="password" placeholder="Enter password">
    <input type="text" v-model="passwordRepeated" placeholder="Repeat password">
  </form>
</template>

<script lang="ts">
import {ref} from 'vue'
export default {
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
}
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    color: #fafafa;
    font-size: 1.2rem;
    padding: .3rem;
    background: none;
    border: none;
    border-bottom: 1px solid #fafafa;
    outline: none;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}

.form-title {
  color: #fafafa;
  margin-bottom: 1.5rem;
}
</style>
