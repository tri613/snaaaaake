<template>
  <div id="app" @click="handleClick">
    <canvas id="map" ref="mapCanvas"/>
    <canvas id="game" ref="gameCanvas"/>
    <div v-if="gameoverMsg">{{ gameoverMsg }}</div>
    <div>{{ score }}</div>
  </div>
</template>

<script>
import { prepareGame } from './game';
let controller;

export default {
  name: 'App',
  data() {
    return {
      isPlaying: false,
      score: 0,
      gameoverMsg: ''
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
      this.gameoverMsg = '';
      const { score: scoreObs } = controller(this.endGame);
      scoreObs.subscribe(score => (this.score = score));
    },
    endGame(error) {
      this.isPlaying = false;
      this.gameoverMsg = error;
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

#map {
  background-color: #37383f;
}

#game {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
