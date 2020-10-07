<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Login from "@/components/Auth/Login.vue";
import Registration from "@/components/Auth/Registration.vue";
export default defineComponent({
  components: {Login, Registration},
  computed: {
  }
})
</script>

<style lang="scss" scoped>
.auth-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.auth-card {
  background-color: #616161;
  border-radius: 5px;
  box-shadow: 0 0 4px 2px rgba(0,0,0, .3);
  padding: 1.5rem;
  padding-bottom: 2rem;
}
</style>