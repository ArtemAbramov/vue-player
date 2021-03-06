<template>
  <div
      class="progress-bar-wrapper"
      @mousemove="progressBarHover"
      @mouseup="progressChange"
      @mouseleave="leaveBar"
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
          :style="{width: `${progressPointer * 100}%`}"
      ></div>
      <div
          class="progress-pointer"
          :style="{left: `${progressPointer * 100}%`}"
          @mousedown="dragged = true"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent, computed} from 'vue'
import {durationToTime} from "@/utils/durationToTime";
import usePlayer from '@/hooks/Player';
export default defineComponent({
  setup() {
    const {changeProgress, progress, duration} = usePlayer()

    const dragged = ref<boolean>(false)
    const bar = ref<HTMLElement>(null)
    const tooltipPos = ref<number>(0)
    const tooltipTime = ref<string>('0:00')
    const progressPhantom = ref<number>(progress.value)

    const progressPointer = computed<number>(() => {
      if (dragged.value) {
        return progressPhantom.value
      } else {
        return progress.value
      }
    })

    const leaveBar = (event) => {
      if (dragged.value) {
        progressChange(event)
      }
      dragged.value = false
    }

    const showTooltip = (event) => {
      if (event.clientX <= 30) {
        tooltipPos.value = 30
      } else if (event.clientX >= bar.value.clientWidth - 30) {
        tooltipPos.value = bar.value.clientWidth - 30
      } else {
        tooltipPos.value = event.clientX
      }

      const current = (duration.value / bar.value.clientWidth) * event.clientX
      tooltipTime.value = durationToTime(current)
    }

    const progressChange = (event) => {
      changePointer(event)
      changeProgress(progressPhantom)
      dragged.value = false
    }

    const changePointer = (event) => {
      progressPhantom.value = 1 / bar.value.clientWidth * event.clientX
    }

    const progressBarHover = (event) => {
      if (dragged.value) {
        changePointer(event)
      }
      showTooltip(event)
    }

    return {
      progressBarHover,
      progressChange,
      dragged,
      bar,
      tooltipPos,
      tooltipTime,
      progressPointer,
      leaveBar
    }
  }
})
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