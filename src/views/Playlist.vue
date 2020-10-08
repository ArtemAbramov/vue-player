<template>
  <div class="playlist">
    <img :src="currentTrack.meta.img" :alt="currentTrack.meta.img" class="current-song-img">
    <ul class="playlist__list">
      <li class="playlist__item" v-for="(track, index) in playlist" :key="index">
        <div class="track-preview">
          <img :src="track.meta.img" :alt="track.meta.title" class="track-preview__img">
          <a href="#" @click.prevent="" class="track__play-btn"><i class="fa fa-play"></i></a>
        </div>
        <div class="track-info">
          <p class="track__title">{{track.meta.title}}</p>
          <p class="track__artist">{{track.meta.artist}}</p>
        </div>
        <p class="track__duration">{{track.meta.duration}}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import {useStore} from "vuex";
import {ITrack} from "@/interfaces/player";
import {durationToTime} from "@/utils/durationToTime";
export default defineComponent({
  setup() {
    const store = useStore()

    const currentTrack = computed<ITrack>(() => {
      return store.getters.getCurrentTrack
    })

    const playlist = computed<ITrack[]>(() => {
      return store.getters.getPlaylist
    })

    playlist.value.forEach((item) => {
      const audio = new Audio(item.src)
      audio.preload = 'metadata'
      audio.addEventListener('loadedmetadata', () => {
        item.meta.duration = durationToTime(audio.duration)
        console.log(audio.duration)
      })
    })

    return {
      currentTrack,
      playlist
    }
  }
})
</script>