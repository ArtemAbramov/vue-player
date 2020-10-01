<template>
  <div
      class="progress-bar"
      ref="bar"
      @mousemove="dragPointer($event)"
      @click="changeProgress"
  >
    <div
        class="primary-progress"
        :style="{width: `${progress * 100}%`}"
    ></div>
    <div
        class="progress-pointer"
        :style="{left: `${progress * 100}%`}"
        @mousedown="dragged = true"
        @mouseup="dragged = false"
    ></div>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue'
export default {
  props: ['progress'],
  setup(props, {emit}) {
    const dragged = ref(false)
    const bar = ref(null)
    const pointer = ref(0)
    const progress = ref(0)
    const dragPointer = (event) => {
      if (dragged.value) {
        if ((event.clientX >= bar.value.offsetLeft) && (event.clientX <= bar.value.offsetLeft + bar.value.clientWidth)) {
          pointer.value = event.clientX - bar.value.offsetLeft
          progress.value = 1 / bar.value.clientWidth * pointer.value * 100
          emit('changeProgress', progress)
        }
      }
    }

    const changeProgress = (event) => {
      if ((event.clientX >= bar.value.offsetLeft) && (event.clientX <= bar.value.offsetLeft + bar.value.clientWidth)) {
        pointer.value = event.clientX - bar.value.offsetLeft
        progress.value = 1 / bar.value.clientWidth * pointer.value * 100
        emit('changeProgress', progress)
      }
    }

    return {
      pointer,
      dragPointer,
      changeProgress,
      dragged,
      bar
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  position: relative;
  width: 100%;
  height: 4px;
  background-color: #616161;
  cursor: pointer;

  &:hover {
    .progress-pointer {
      display: block;
    }
  }
}

.primary-progress {
  position: absolute;
  left: 0;
  height: 100%;
  width: 0;
  background-color: #c30000;
}

.progress-pointer {
  position: absolute;
  top: 50%;
  display: none;
  width: 1rem;
  height: 1rem;
  background-color: #c30000;
  transform: translate(-50%, -50%);
  border: 10px solid transparent;
  border-radius: 50%;
  cursor: pointer;
}
</style>