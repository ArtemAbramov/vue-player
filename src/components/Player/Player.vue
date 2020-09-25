<template>
  <div class="player">
    <progress-bar :progress="progress"></progress-bar>
    <div class="player-body">
      <controls :paused="paused" @playpause="playPause"></controls>
      <p class="player__timer">{{currentMinutes}}:{{currentSeconds}} / {{durationMinutes}}:{{durationSeconds}}</p>
      <div class="track-meta">
        <img class="track-meta__img" :src="[currentTrack.meta.img]" :alt="[currentTrack.meta.album]">
        <div class="track-meta-body">
          <router-link to="/" class="track-meta__title">{{currentTrack.meta.title}}</router-link>
          <p>
            <router-link to="/" class="track-meta__artist">{{currentTrack.meta.artist}}</router-link>
            <span> • </span>
            <router-link to="/" class="track-meta__album">{{currentTrack.meta.album}}</router-link>
            <span> • </span>
            <router-link to="/" class="track-meta__year">{{currentTrack.meta.year}}</router-link>
          </p>
        </div>
      </div>
      <volume
          :volume="1"
          @volumeToggle="volumeToggle"
      ></volume>
    </div>
  </div>
</template>

<script lang="ts">
import {useStore} from 'vuex'
import {ref, toRefs, watch, reactive, computed} from 'vue'
import ProgressBar from "@/components/Player/ProgressBar.vue";
import Controls from "@/components/Player/Controls.vue";
import Volume from "@/components/Player/Volume.vue";

export default {
  components: {
    'progress-bar': ProgressBar,
    Controls,
    Volume
  },
  setup() {
    const store = useStore()

    const currentTrack = computed(() => {
      return store.getters.getCurrentTrack
    })

    const audio = new Audio()
    audio.src = currentTrack.value.src
    audio.volume = 0.1

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

    const paused = ref(audio.paused)

    const playPause = () => {
      console.log(audio)
      if (audio.paused) {
        audio.play()
        paused.value = false
      } else {
        audio.pause()
        paused.value = true
      }
    }

    const volumeToggle = () => {

    }

    return {
      playPause,
      paused,
      progress,
      currentMinutes,
      currentSeconds,
      durationMinutes,
      durationSeconds,
      currentTrack,
      volumeToggle
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

.track-meta {
  display: flex;
  margin: 0 25rem;
  color: #fafafa;

  &-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: .4rem 1rem;
  }

  a {
    color: #fafafa;
  }
}
</style>