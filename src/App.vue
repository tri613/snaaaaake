<template>
  <div id="app" @click="handleClick">
    <canvas id="map" ref="mapCanvas" />
    <canvas id="game" ref="gameCanvas" />
  </div>
</template>

<script>
import { prepareGame } from './game';
let controller;

export default {
  name: 'App',
  data() {
    return {
      isPlaying: false
    };
  },
  mounted() {
    controller = prepareGame(this.$refs.gameCanvas, this.$refs.mapCanvas);
    this.startGame();
  },
  methods: {
    handleClick() {
      if (this.isPlaying) {
        return;
      }
      this.startGame();
    },
    startGame() {
      this.isPlaying = true;
      controller(this.endGame);
    },
    endGame(error) {
      this.isPlaying = false;
      console.error(error);
    }
  }
};
</script>

<style scoped>
canvas {
  --canvas-border-color: coral;
  border: 1px solid var(--canvas-border-color);
}

#app {
  position: relative;
}

#game {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
