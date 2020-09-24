<template>
  <div class="progress-bar">
    <div class="primary-progress" :style="{width: `${progress * 100}%`}"></div>
    <div class="progress-pointer" :style="{left: `${progress * 100}%`}"></div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['progress']
}
</script>

<style lang="scss" scoped>
.progress-bar {
  position: relative;
  width: 100%;
  height: 4px;
  background-color: #616161;
  cursor: pointer;

  &:hover {
    .progress-pointer {
      display: block;
    }
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
  width: 1rem;
  height: 1rem;
  background-color: #c30000;
  transform: translate(-50%, -50%);
  border: 10px solid transparent;
  border-radius: 50%;
  cursor: pointer;
}
</style>