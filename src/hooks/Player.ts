import {useStore} from 'vuex'
import {ref, computed, defineComponent, watch} from 'vue'
import {durationToTime} from "@/utils/durationToTime";
import {getFromStorage, setToStorage} from "@/utils/localStorage";
import {ITrack} from "@/interfaces/player";

const audio: HTMLAudioElement = new Audio()

export default function usePlayer() {
  const store = useStore()

  if (getFromStorage('currentTrack')) {
    store.dispatch('setCurrentTrack', JSON.parse(getFromStorage('currentTrack')))
  }

  const currentTrack = computed<ITrack>(() => {
    return store.getters.getCurrentTrack
  })

  watch(() => currentTrack.value, () => {
    audio.src = currentTrack.value.src
    play()
  })

  audio.src = currentTrack.value.src
  audio.currentTime = +getFromStorage('progress')

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
    audio.currentTime = Math.floor(audio.duration * percent.value)
    progress.value = audio.currentTime / audio.duration
  }

  const paused = ref(audio.paused)

  const play = async () => {
    try {
      await audio.play()
      paused.value = false
    }
    catch (err) {
      console.log(err)
    }
  }

  const pause = async () => {
    try {
      await audio.pause()
      paused.value = true
    }
    catch (err) {
      console.log(err)
    }
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
  }

  const nextTrack = () => {
    store.dispatch('nextTrack')
  }

  const volumeLevel = ref(+getFromStorage('volume'))
  if (+getFromStorage('volume')) {
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
    setToStorage('currentTrack', JSON.stringify(currentTrack.value))
    setToStorage('progress', audio.currentTime)
  })

  audio.addEventListener('ended', nextTrack)

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