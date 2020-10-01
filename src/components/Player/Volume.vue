<template>
  <div class="volume-block">
    <div
        class="volume-bar"
        ref="bar"
        @mousemove="dragPointer($event)"
        @click="changeVolume"
    >
      <div class="volume-bar__primary" :style="{width: `${pointer}px`}"></div>
      <div
          class="volume-bar__pointer"
          @mousedown="dragged = true"
          @mouseup="dragged = false"
          :style="{left: `${pointer}px`}"
      ></div>
    </div>
    <a href="#" class="volume-toggle" @click.prevent="volumeToggle">
      <i class="fas" :class="[volume ? 'fa-volume-up' : '', 'fa-volume-mute']"></i>
    </a>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue'
export default {
  props: ['volume'],
  setup(props, {emit}) {
    const volumeToggle = () => {
      emit('volumeToggle')
    }

    const dragged = ref(false)
    const bar = ref(null)
    const pointer = ref(80)
    const volume = ref(1)
    emit('volumeChange', volume)

    const dragPointer = (event) => {
      if (dragged.value) {
        if ((event.clientX >= bar.value.offsetLeft) && (event.clientX <= bar.value.offsetLeft + bar.value.clientWidth)) {
          pointer.value = event.clientX - bar.value.offsetLeft
          volume.value = 1 / bar.value.clientWidth * pointer.value
          emit('volumeChange', volume)
        }
      }
    }

    const changeVolume = (event) => {
      if ((event.clientX >= bar.value.offsetLeft) && (event.clientX <= bar.value.offsetLeft + bar.value.clientWidth)) {
        pointer.value = event.clientX - bar.value.offsetLeft
        volume.value = 1 / bar.value.clientWidth * pointer.value
        emit('volumeChange', volume)
      }
    }

    return {
      volumeToggle,
      dragged,
      dragPointer,
      bar,
      pointer,
      changeVolume
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
  background-color: #616161;
  border-radius: 1px;
  cursor: pointer;

  &__primary {
    position: absolute;
    height: 100%;
    border-radius: 1px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background-color: #fafafa;
  }

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