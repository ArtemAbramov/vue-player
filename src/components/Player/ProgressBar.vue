<template>
  <div
      class="progress-bar-wrapper"
      @mousemove="dragPointer($event)"
      @click="changeProgress"
  >
    <div
        class="progress-bar"
        ref="bar"
    >
    <span
        class="progress-bar__tooltip"
        :style="{left: `${tooltipPos}px`}"
    >{{tooltipTime}}</span>
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
  </div>
</template>

<script lang="ts">
import {ref} from 'vue'
import {durationToTime} from "@/utils/durationToTime";
export default {
  props: ['progress', 'durationTime'],
  setup(props, {emit}) {
    const dragged = ref(false)
    const bar = ref(null)
    const pointer = ref(0)
    const progress = ref(0)
    const tooltipPos = ref(0)
    const tooltipTime = ref('0:00')
    const dragPointer = (event) => {
      if (dragged.value) {
        if ((event.clientX >= bar.value.offsetLeft) && (event.clientX <= bar.value.offsetLeft + bar.value.clientWidth)) {
          pointer.value = event.clientX - bar.value.offsetLeft
          progress.value = 1 / bar.value.clientWidth * pointer.value * 100
          emit('changeProgress', progress)
        }
      }

      if (event.clientX <= 30) {
        tooltipPos.value = 30
      } else if (event.clientX >= bar.value.clientWidth - 30) {
        tooltipPos.value = bar.value.clientWidth - 30
      } else {
        tooltipPos.value = event.clientX
      }

      const current = (props.durationTime / bar.value.clientWidth) * event.clientX
      tooltipTime.value = durationToTime(current)
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
      bar,
      tooltipPos,
      tooltipTime
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  position: relative;
  width: 100%;
  height: 3px;
  background-color: #616161;

  &-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    padding: 16px 0px;
    width: 100%;
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
      .progress-pointer {
        display: block;
      }

      .progress-bar__tooltip {
        display: block;
      }
  }
  }

  &__tooltip {
    position: absolute;
    top: -30px;
    display: none;
    color: #fafafa;
    background-color: #424242;
    border-radius: 2px;
    font-size: .8rem;
    padding: .2rem .4rem;
    transform: translateX(-50%);
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
  width: 4px;
  height: 4px;
  background-color: #c30000;
  transform: translate(-50%, -50%);
  border: 8px solid transparent;
  border-radius: 50%;
  cursor: pointer;
}
</style>