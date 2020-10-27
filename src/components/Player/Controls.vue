<template>
  <div class="controls">
    <a class="controls-link" href="#" @click.prevent="prevTrack">
      <i class="controls-link__icon fas fa-step-backward"></i>
    </a>
    <a class="controls-link play-pause" href="#" @click.prevent="playPause">
      <i class="controls-link__icon fa" :class="[paused ? 'fa-play' : '', 'fa-pause']"></i>
    </a>
    <a class="controls-link" href="#" @click.prevent="nextTrack">
      <i class="controls-link__icon fas fa-step-forward"></i>
    </a>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import usePlayer from '@/hooks/Player'
export default defineComponent({
  setup() {
    const {paused, playPause, nextTrack, prevTrack} = usePlayer()

    return {
      paused,
      playPause,
      nextTrack,
      prevTrack
    }
  }
})
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  align-items: center;

  &-link {
    color: #fafafa;
    font-size: 1.2rem;
    text-shadow: 0 0 6px rgba(0,0,0, .5);
    transition: .5s;

    &.play-pause {
      margin: 0 2.4rem;
      font-size: 1.7rem;
    }

    &__icon{
      transition: .1s;

      &:hover {
        text-shadow: 0 0 10px rgba(0,0,0, .5);
      }
    }
  }
}
</style>