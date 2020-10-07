<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  computed: {
    layout() {
      return this.$route.meta.layout || 'default-layout'
    }
  }
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  background-color: #1b1b1b;
  font-family: 'Roboto', sans-serif;

  &::-webkit-scrollbar {
    width: .5rem;
    background-color: #1b1b1b;
  }

  &::-webkit-scrollbar-track {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #616161;
  }
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}
</style>
