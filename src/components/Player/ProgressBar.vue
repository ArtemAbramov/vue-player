<template>
  <div class="progress-bar">
    <div class="primary-progress" :style="{width: `${progress * 100}%`}"></div>
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
}

.primary-progress {
  position: absolute;
  left: 0;
  height: 100%;
  width: 0;
  background-color: #c30000;
}
</style>