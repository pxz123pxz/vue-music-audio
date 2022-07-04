<template>
  <div class="center">
    <MusicHeader></MusicHeader>
    <!-- <MusicContent></MusicContent> -->
    <router-view></router-view>
    <MusicFooter></MusicFooter>
    <LoginInterface></LoginInterface>
  </div>
</template>

<script>
import MusicHeader from "@/components/MusicHeader";
// import MusicContent from "@/components/MusicContent";
import MusicFooter from "@/components/MusicFooter";
import LoginInterface from '@/components/LoginInterface'
export default {
    name: "MusicCenter",
    components: {MusicHeader,MusicFooter,LoginInterface}
}
</script>

<style lang="less" scoped>
    .center {
    flex: 3.9;
    display: flex;
    flex-direction: column;
    background-color: rgb(249, 203, 201);
    position: relative;
    
    }
</style>