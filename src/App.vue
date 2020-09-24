<template>
  <app-header></app-header>
  <router-view/>
  <app-player></app-player>
</template>

<script lang="ts">
import Header from "@/components/Template/Header.vue";
import Player from "@/components/Player/Player.vue";

export default {
  components: {
    appHeader: Header,
    appPlayer: Player
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #1b1b1b;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;

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
</style>
