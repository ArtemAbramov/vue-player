<template>
  <div class="controls">
    <a class="controls-link" href="#" @click.prevent>
      <i class="controls-link__icon fa fa-backward"></i>
    </a>
    <a class="controls-link play-pause" href="#" @click.prevent="playPause">
      <i class="controls-link__icon fa" :class="[paused ? 'fa-play' : '', 'fa-pause']"></i>
    </a>
    <a class="controls-link" href="#" @click.prevent>
      <i class="controls-link__icon fa fa-forward"></i>
    </a>
  </div>
</template>

<script lang="ts">
export default {
  props: ['paused'],
  setup(props, {emit}) {

    const playPause = () => {
      emit('playpause')
    }

    return {
      playPause
    }
  }
}
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  align-items: center;

  &-link {
    color: #fafafa;
    font-size: 1.5rem;
    text-shadow: 0 0 4px rgba(0,0,0, .5);

    &.play-pause {
      margin: 0 1rem;
      font-size: 2rem;
    }

    &__icon{
      transition: .1s;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>