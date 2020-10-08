<template>
  <div class="volume-block">
    <div
        class="volume-bar-wrapper"
        @mousemove="dragPointer"
        @mouseup="changeVolume"
    >
      <div
          class="volume-bar"
          ref="bar"
      >
        <div class="volume-bar__primary" :style="{width: `${volume * 100}%`}"></div>
        <div
            class="volume-bar__pointer"
            @mousedown="dragged = true"
            :style="{left: `${volume * 100}%`}"
        ></div>
      </div>
    </div>
    <a href="#" class="volume-toggle" @click.prevent="volumeToggle">
      <i class="fas" :class="[volumeLevel ? 'fa-volume-up' : '', 'fa-volume-mute']"></i>
    </a>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'
export default defineComponent({
  props: ['volumeLevel'],
  setup(props, {emit}) {
    const volumeToggle = () => {
      emit('volumeToggle')
    }

    const dragged = ref<boolean>(false)
    const bar = ref<HTMLElement>(null)
    const volume = ref<number>(props.volumeLevel)
    emit('volumeChange', volume)

    const dragPointer = (event) => {
      if (dragged.value) {
        if ((event.clientX > bar.value.offsetLeft) && (event.clientX < bar.value.offsetLeft + bar.value.clientWidth)) {
          volume.value = 1 / bar.value.clientWidth * (event.clientX - bar.value.offsetLeft)
        } else if (event.clientX <= bar.value.offsetLeft) {
          volume.value = 0
          dragged.value = false
        } else if (event.clientX >= bar.value.offsetLeft + bar.value.clientWidth) {
          volume.value = 1
          dragged.value = false
        }
        emit('volumeChange', volume)
      }
    }

    const changeVolume = (event) => {
      if ((event.clientX > bar.value.offsetLeft) && (event.clientX < bar.value.offsetLeft + bar.value.clientWidth)) {
        volume.value = 1 / bar.value.clientWidth * (event.clientX - bar.value.offsetLeft)
      } else if (event.clientX <= bar.value.offsetLeft) {
        volume.value = 0
        dragged.value = false
      } else if (event.clientX >= bar.value.offsetLeft + bar.value.clientWidth) {
        volume.value = 1
        dragged.value = false
      }
      emit('volumeChange', volume)
      dragged.value = false
    }

    return {
      volumeToggle,
      dragged,
      dragPointer,
      bar,
      changeVolume,
      volume
    }
  }
})
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
  width: 100%;
  height: 3px;
  background-color: #616161;
  border-radius: 1px;

  &-wrapper {
    padding: 16px 0px;
    margin-right: 1rem;
    width: 80px;
    cursor: pointer;
  }

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