<template>
  <div class="playlist">
    <img :src="currentTrack.meta.imgBig" :alt="currentTrack.meta.img" class="current-song-img">
    <ul class="playlist__list">
      <li
          class="playlist__item"
          v-for="(track, index) in playlist"
          :key="index"
          :class="{'active': track.id === currentTrack.id}"
      >
        <div class="track-preview">
          <img :src="track.meta.img" :alt="track.meta.title" class="track-preview__img">
          <a href="#" @click.prevent="changeTrack(track)" class="track__play-btn">
            <i class="fa" :class="[!paused && track.id === currentTrack.id ? 'fa-pause' : 'fa-play']"></i>
          </a>
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
import usePlayer from "@/hooks/Player";
export default defineComponent({
  setup() {
    const {paused, currentTrack, playPause} = usePlayer()

    const store = useStore()

    const playlist = computed<ITrack[]>(() => {
      return store.getters.getPlaylist
    })

    playlist.value.forEach((item) => {
      const audio = new Audio(item.src)
      audio.preload = 'metadata'
      audio.addEventListener('loadedmetadata', () => {
        item.meta.duration = durationToTime(audio.duration)
      })
    })

    const changeTrack = (track) => {
      if (currentTrack.value.id === track.id) {
        playPause()
      } else {
        store.dispatch('setCurrentTrack', track)
      }
    }

    return {
      currentTrack,
      playlist,
      changeTrack,
      paused
    }
  }
})
</script>

<style lang="scss" scoped>
.playlist {
  display: flex;
  padding: 3rem;

  &__list {
    margin-left: 8rem;
    width: 40%;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #616161;
    color: #fafafa;

    &.active {
      background-color: rgba(255,255,255, .1);
    }
  }
}

.track {
  &-preview {
    position: relative;
    width: 40px;
    height: 40px;

    &:hover {
      .track__play-btn {
        display: flex;
      }
    }

    &__img {
      width: 100%;
      height: 100%;
    }
  }

  &__play-btn {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: none;
    justify-content: center;
    align-items: center;
    color: #fafafa;
    background-color: rgba(0,0,0, .5);
  }

  &-info {
    margin-left: 20px;
    margin-right: auto;
  }

  &__title {
    font-weight: 600;
  }

  &__artist {
    font-size: .8rem;
  }
}

.current-song-img {
  height: 70vh;
}
</style>