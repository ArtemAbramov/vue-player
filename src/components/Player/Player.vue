<template>
  <div class="player">
    <div class="player-body">
      <progress-bar></progress-bar>
      <controls></controls>
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
      <volume></volume>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ProgressBar from "@/components/Player/ProgressBar.vue";
import Controls from "@/components/Player/Controls.vue";
import Volume from "@/components/Player/Volume.vue";
import usePlayer from '@/hooks/Player'

export default defineComponent({
  components: {
    'progress-bar': ProgressBar,
    Controls,
    Volume
  },
  setup() {
    const {currentTrack, currentTime, durationTime} = usePlayer()

    return {
      currentTrack,
      currentTime,
      durationTime
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
  margin-left: 14rem;
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