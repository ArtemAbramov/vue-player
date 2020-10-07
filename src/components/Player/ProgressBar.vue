<template>
  <div
      class="progress-bar-wrapper"
      @mousemove="progressBarHover"
      @mouseup="changeProgress"
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
          :style="{width: `${progressNew * 100}%`}"
      ></div>
      <div
          class="progress-pointer"
          :style="{left: `${progressNew * 100}%`}"
          @mousedown="dragged = true"
          @mouseup="changeProgress"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent, computed} from 'vue'
import {durationToTime} from "@/utils/durationToTime";
export default defineComponent({
  props: ['progress', 'durationTime'],
  setup(props, {emit}) {
    const dragged = ref<boolean>(false)
    const bar = ref<HTMLElement>(null)
    const pointer = ref<number>(0)
    const progress = ref<number>(0)
    const tooltipPos = ref<number>(0)
    const tooltipTime = ref<string>('0:00')
    const progressPhantom = ref<number>(props.progress)

    const progressNew = computed(() => {
      if (dragged.value) {
        return progressPhantom.value
      } else {
        return props.progress
      }
    })

    const progressBarHover = (event) => {
      dragPointer(event)
      showTooltip(event)
    }

    const dragPointer = (event) => {
      if (dragged.value) {
        if ((event.clientX >= bar.value.offsetLeft) && (event.clientX <= bar.value.offsetLeft + bar.value.clientWidth)) {
          pointer.value = event.clientX - bar.value.offsetLeft
          progressPhantom.value = 1 / bar.value.clientWidth * pointer.value
        }
      }
    }

    const changeProgress = (event) => {
      if ((event.clientX >= bar.value.offsetLeft) && (event.clientX <= bar.value.offsetLeft + bar.value.clientWidth)) {
        pointer.value = event.clientX - bar.value.offsetLeft
        progress.value = 1 / bar.value.clientWidth * pointer.value * 100
        emit('changeProgress', progress)
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

      const current = (props.durationTime / bar.value.clientWidth) * event.clientX
      tooltipTime.value = durationToTime(current)
    }

    return {
      progressBarHover,
      pointer,
      changeProgress,
      dragged,
      bar,
      tooltipPos,
      tooltipTime,
      progressNew
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