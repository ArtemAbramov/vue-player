<template>
  <header class="header">
    <router-link class="logo" to="/">
      <img class="logo__img" src="@/assets/img/logo.png" alt="Logo">
    </router-link>
  </header>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'
export default defineComponent({
  setup() {
    const nav = ref([])

    return {}
  }
})
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  padding: 1rem 1.5rem;
  background-color: #424242;
  box-shadow: 0 0 6px 2px rgba(0,0,0, .3);
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;

  &__img {
    width: 100%;
  }
}
</style>