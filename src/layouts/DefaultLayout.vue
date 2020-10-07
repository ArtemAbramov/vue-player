<template>
  <app-header></app-header>
  <slot></slot>
  <app-player></app-player>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Header from "@/components/Template/Header.vue";
import Player from "@/components/Player/Player.vue";
export default defineComponent({
  components: {
    appHeader: Header,
    appPlayer: Player
  }
})
</script>

<style lang="scss" scoped></style>