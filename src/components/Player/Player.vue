<template>
  <div class="player">
    <div class="player-body">
      <progress-bar
          :progress="progress"
          @changeProgress="changeProgress"
          :durationTime="duration"
      ></progress-bar>
      <controls
          :paused="paused"
          @playpause="playPause"
          @prevTrack="prevTrack"
          @nextTrack="nextTrack"
      ></controls>
      <p class="player__timer">{{currentTime}} / {{durationTime}}</p>
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
          :volumeLevel="volumeLevel"
          @volumeToggle="volumeToggle"
          @volumeChange="volumeChange"
      ></volume>
    </div>
  </div>
</template>

<script lang="ts">
import {useStore} from 'vuex'
import {ref, computed, reactive, defineComponent} from 'vue'
import ProgressBar from "@/components/Player/ProgressBar.vue";
import Controls from "@/components/Player/Controls.vue";
import Volume from "@/components/Player/Volume.vue";
import {durationToTime} from "@/utils/durationToTime";
import {getFromStorage, setToStorage} from "@/utils/localStorage";
import {ICurrentTrack} from "@/interfaces/player";

export default defineComponent({
  components: {
    'progress-bar': ProgressBar,
    Controls,
    Volume
  },
  setup() {
    const store = useStore()

    const currentTrack = computed<ICurrentTrack>(() => {
      return store.getters.getCurrentTrack
    })

    const audio: HTMLAudioElement = new Audio()
    audio.src = currentTrack.value.src

    const progress = ref<number>(0)
    const currentTime = ref<string>('0:00')
    const durationTime = ref<string>('0:00')
    const duration = ref<number>(0)

    audio.addEventListener('timeupdate', () => {
      currentTime.value = durationToTime(audio.currentTime)
      durationTime.value = durationToTime(audio.duration)
      progress.value = audio.currentTime / audio.duration
    })

    audio.addEventListener('canplay', () => {
      duration.value = audio.duration
    })

    const changeProgress = (percent) => {
      audio.currentTime = Math.floor(audio.duration / 100 * percent.value)
      progress.value = audio.currentTime / audio.duration
    }

    const paused = ref(audio.paused)

    const play = () => {
      audio.play()
      paused.value = false
    }

    const pause = () => {
      audio.pause()
      paused.value = true
    }

    const playPause = () => {
      if (audio.paused) {
        play()
      } else {
        pause()
      }
    }

    const prevTrack = () => {
      store.dispatch('prevTrack')
      audio.src = currentTrack.value.src
      play()
    }

    const nextTrack = () => {
      store.dispatch('nextTrack')
      audio.src = currentTrack.value.src
      play()
    }

    const volumeLevel = ref(+getFromStorage('volume'))
    if (+getFromStorage('volume')) {
      console.log(+getFromStorage('volume'))
      volumeLevel.value = +getFromStorage('volume')
    } else {
      setToStorage('volume', volumeLevel)
    }

    const volumeToggle = () => {
      if (volumeLevel.value) {
        volumeLevel.value = 0
        audio.volume = 0
      } else {
        volumeLevel.value = +getFromStorage('volume')
        audio.volume = +getFromStorage('volume')
      }
    }

    const volumeChange = (volume) => {
      audio.volume = volume.value
      volumeLevel.value = volume.value
    }

    window.addEventListener('unload', () => {
      setToStorage('volume', audio.volume)
    })

    return {
      currentTrack,
      paused,
      playPause,
      prevTrack,
      nextTrack,
      progress,
      changeProgress,
      currentTime,
      durationTime,
      duration,
      volumeLevel,
      volumeToggle,
      volumeChange
    }
  }
})
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #424242;

  &-body {
    position: relative;
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
  }

  &__timer {
    margin-left: 2rem;
    font-size: .9rem;
    color: #fafafa;
  }
}

.track-meta {
  display: flex;
  margin-left: 18rem;
  margin-right: auto;
  height: 50px;
  color: #fafafa;

  &__img {
    width: 50px;
  }

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