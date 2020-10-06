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
      <button @click="testToggle">Toggle</button>
      <p>{{audioRef.paused}}</p>
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
          :volume="volumeLevel"
          @volumeToggle="volumeToggle"
          @volumeChange="volumeChange"
      ></volume>
    </div>
  </div>
</template>

<script lang="ts">
import {useStore} from 'vuex'
import {ref, computed, reactive} from 'vue'
import ProgressBar from "@/components/Player/ProgressBar.vue";
import Controls from "@/components/Player/Controls.vue";
import Volume from "@/components/Player/Volume.vue";
import {durationToTime} from "@/utils/durationToTime";

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

    const audioRef = reactive(new Audio)

    audioRef.src = currentTrack.value.src

    const testToggle = () => {
      if (audioRef.paused) {
        audioRef.play()
        console.log(audioRef.paused)
      } else {
        audioRef.pause()
        console.log(audioRef.paused)
      }
    }

    const audio = new Audio()
    audio.src = currentTrack.value.src

    const progress = ref(0)
    const currentTime = ref('0:00')
    const durationTime = ref('0:00')
    const duration = ref(0)

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

    const volumeLevel = ref(audio.volume)
    const volumeSet = ref(audio.volume)

    const volumeToggle = () => {
      if (volumeLevel.value) {
        volumeLevel.value = 0
        audio.volume = 0
      } else {
        volumeLevel.value = volumeSet.value
        audio.volume = volumeSet.value
      }
    }

    const volumeChange = (volume) => {
      audio.volume = volume.value
      volumeSet.value = volume.value
    }

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
      volumeChange,
      testToggle,
      audioRef
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