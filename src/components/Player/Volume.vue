<template>
  <div class="volume-block">
    <div class="volume-bar">
      <div class="volume-bar__pointer"></div>
    </div>
    <a href="#" class="volume-toggle" @click.prevent="volumeToggle">
      <i class="fas" :class="[volume ? 'fa-volume-up' : '', 'fa-volume-mute']"></i>
    </a>
  </div>
</template>

<script lang="ts">
export default {
  props: ['volume'],
  setup(props, {emit}) {
    const volumeToggle = () => {
      emit('volumeToggle')
    }

    return {
      volumeToggle
    }
  }
}
</script>

<style lang="scss" scoped>
.volume-toggle {
  width: 2rem;
  color: #bdbdbd;
  font-size: 1.4rem;
}

.volume-block {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 0;
}

.volume-bar {
  position: relative;
  margin-right: 1rem;
  height: 3px;
  width: 5rem;
  background-color: #bdbdbd;
  border-radius: 1px;
  cursor: pointer;

  &__pointer {
    position: absolute;
    top: 50%;
    left: 0;
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    background-color: #fafafa;
    transform: translate(-50%, -50%);
  }
}
</style>