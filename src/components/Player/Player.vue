<template>
  <div class="player">
    <progress-bar :progress="progress"></progress-bar>
    <div class="player-body">
      <controls :paused="paused" @playpause="playPause"></controls>
      <p class="player__timer">{{currentMinutes}}:{{currentSeconds}} / {{durationMinutes}}:{{durationSeconds}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, toRefs, watch, reactive, computed} from 'vue'
import ProgressBar from "@/components/Player/ProgressBar.vue";
import Controls from "@/components/Player/Controls.vue";

export default {
  components: {
    'progress-bar': ProgressBar,
    Controls
  },
  setup() {
    const audio = new Audio()
    audio.src = 'Audio.mp3'
    audio.volume = 0.1

    const paused = ref(audio.paused)
    const progress = ref(0)
    const currentMinutes = ref('0')
    const currentSeconds = ref('00')
    const durationMinutes = ref('0')
    const durationSeconds = ref('00')


    audio.addEventListener('timeupdate', () => {
      currentMinutes.value = `${Math.floor(Math.floor(audio.currentTime) / 60)}`
      currentSeconds.value = `${Math.floor(audio.currentTime) % 60 < 10 ? `0${Math.floor(audio.currentTime) % 60}` : Math.floor(audio.currentTime) % 60}`
      durationMinutes.value = `${Math.floor(Math.floor(audio.duration) / 60)}`
      durationSeconds.value = `${Math.floor(audio.duration) % 60 < 10 ? `0${Math.floor(audio.duration) % 60}` : Math.floor(audio.duration) % 60}`
      progress.value = audio.currentTime / audio.duration
    })

    const playPause = () => {
      if (audio.paused) {
        audio.play()
        paused.value = false
      } else {
        audio.pause()
        paused.value = true
      }
    }

    return {
      playPause,
      paused,
      progress,
      currentMinutes,
      currentSeconds,
      durationMinutes,
      durationSeconds
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #424242;

  &-body {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
  }

  &__timer {
    margin-left: 2rem;
    color: #fafafa;
  }
}
</style>