<template>
  <div class="app">
    <MusicAside></MusicAside>
    <MusicCenter></MusicCenter>
    <MusicLyric></MusicLyric>
  </div>
</template>

<script>
import MusicAside from "@/components/MusicAside.vue"
import MusicCenter from '@/components/MusicCenter.vue';
import MusicLyric from '@/components/MusicLyric.vue'
export default {
  name: 'App',
  components: {MusicAside,MusicCenter,MusicLyric}
}
</script>

<style lang="less">
  .app {
      margin: 10px auto;
      width: 1060px;
      height: 700px;
      display: flex;
      font-weight: bold;
      position: relative;
      overflow: hidden;
    }
</style>
