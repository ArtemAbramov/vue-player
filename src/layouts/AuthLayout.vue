<template>
  <div class="auth-wrapper">
    <slot/>
  </div>
</template>

<script lang="ts">
import Login from "@/components/Auth/Login.vue";
import Registration from "@/components/Auth/Registration.vue";
export default {
  components: {Login, Registration},
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.auth-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
</style>