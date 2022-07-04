<template>
  <div class="footer">
    <div class="audio-container">
      <audio autoPlay preload="metadata" :src="link" ref="Audio" @playing="updatePlay" @pause="updatePause" @play="getDuration" @timeupdate="getCurrentTime"></audio>
      <!-- 进度条 -->
      <div class="progress" @click="changeProgess">
        <div class="progress-spot" :style="{width: width}" >
          <i class="iconfont icon-dian" @mousedown.self="Mousedown($event)" @mousemove.self="Mousemove($event)" @mouseup.self="MouseUp($event)" @mouseleave.self="MouseLeave($event)"></i>
        </div>
      </div>
      <div class="audioContainer">
        <!-- 歌曲小封面部分 -->
        <div class="musiccover">
          <div class="coverimage-container" @click="controlLyric">
            <img :src="albumImageUrl" alt="封面" >
            
          </div>
          <div class="music-settle">
            <div class="music-message" v-show="!link">忘记时间 - 胡歌</div>
            <div class="music-message" v-show="link" >
              <span >{{songname}}-</span>
              <span v-for="(singer,index) in singername" :key="index" :title="singer.name">{{singer.name}} </span>
            </div>
            <span class="iconfont icon-aixin aixin iconitem"></span>
            <span class="iconfont icon-xiazai iconitem"></span>
            <span class="iconfont icon-gengduocaozuo iconitem"></span>
            <span class="iconfont icon-pinglun iconitem"></span>
          </div>
        </div>
        <!-- 歌曲播放控件部分 -->
        <div class="playControl-warpper">
          <div class="playControl">
            <span class="iconfont icon-24gl-shuffle playitem"></span>
            <span class="iconfont icon-shangyiqu101 playitem"></span>
            <div class="bofangzanting">
              <span class="iconfont icon-24gl-play playitem bofang" v-if="!isPlay" @click="playMusic"></span>
              <span class="iconfont icon-bofangzanting playitem zangting" v-if="isPlay" @click="pauseMuisc"></span>
            </div>
            <span class="iconfont icon-xiayiqu101 playitem"></span>
            <span class="iconfont icon-yinliang playitem"></span>
          </div>
        </div>
        <div class="timeContainer">
          <span>{{updateTotalTime}}</span>/
          <span>{{totalTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex';
import {reqGetMusicLyric} from '@/api/index'
export default {
  name: "MusicFooter",
  data() {
    return {
      isPlay: false,
      // 歌曲总时长
      duration: 0,
      audio: null,
      currentTime: 0,
      width: '0%',
      numberWidth: 0,
      x:438,
      isDrag: false,
      currentWidth: 0,
      count: 0,
    };
  },
  methods: {
    // 暂停音乐
    pauseMuisc(){
      // let audio = this.$refs.Audio;
      this.audio.pause();
      this.isPlay = false;
    },
    // 播放音乐
    playMusic(){
      // let audio = this.$refs.Audio;
      this.audio.play();
      this.isPlay = true;
    },
    // 获取歌曲的长度
    getDuration(){
      // let audio = this.$refs.Audio;
      this.duration = this.audio.duration
      // console.log(audio.currentTime)
    },
    // 获取歌曲当前的播放时间
    getCurrentTime(){
      this.currentTime = this.audio.currentTime;
    },
    // 按下鼠标，将歌曲暂停
    Mousedown(e){
      e.stopPropagation();
      this.isDrag = true;
      if(this.link){
        this.audio.pause();
      }
      
      
    },
    // 鼠标移动时，改变进度条的长度，达到拖动进度条的效果
    Mousemove(e){
      e.stopPropagation();
      if(this.isDrag){
        this.currentWidth =((e.clientX - this.x) / 854) * 100;
        this.currentTime = ((this.currentWidth / 100) * this.duration);
        if(this.currentWidth >= 99){
          this.width = '99%';
        }else{
          this.width = this.currentWidth + '%';
        }
      }
      
    },
    // 鼠标松开时，播放音乐，并将播放时间切换到点击的位置
    MouseUp(e){
      e.stopPropagation();
      this.isDrag = false;
      // console.log((this.currentWidth / 100) * this.duration)
      // 鼠标松开，改变歌曲播放的位置
      this.audio.currentTime = ((this.currentWidth / 100) * this.duration)
      if(this.link){
        this.audio.play()
      }
      
    },
    // 处理小问题，鼠标在进度条外松开，但是isDrag没有变为false，当鼠标继续移动，进度条还是会跟着动
    MouseLeave(e){
      e.stopPropagation();
      if(this.link){
        this.audio.play();
      }
      
      this.isDrag = false;
    },
    // 点击进度条的某个部分，跳转到相应的播放位置，进度条也随之改变
    changeProgess(e){
      e.stopPropagation()
      this.currentWidth =((e.clientX - this.x) / 854) * 100;
      
      if(this.currentWidth >= 99){
        this.width = '99%';
      }else{
        this.width = this.currentWidth + '%';
        this.audio.currentTime = ((this.currentWidth / 100) * this.duration)
        this.currentTime = ((this.currentWidth / 100) * this.duration);
      }
    },
    // 点击封面，出现歌词页面,并发送请求，获取歌词
    async controlLyric(){
      this.$bus.$emit('showLyric',true);
      if(this.songmid){
        let result = await reqGetMusicLyric(this.songmid);
        let musicLyric = result.data.data.lyric;
        // 获取歌词，存储到vuex中
        this.$store.dispatch('getMusicLyric',musicLyric);

        // console.log(typeof(musicLyric));
      }
      
    },
    updatePlay(){
      this.isPlay = true;
      this.$store.dispatch('updateAudioStatus',this.isPlay);
    },
    updatePause(){
      this.isPlay = false;
      this.$store.dispatch('updateAudioStatus',this.isPlay);
    }
  },
  computed: {
    // 歌曲的总时长
    totalTime(){
      let m = Math.floor(this.duration / 60) < 10 ? '0' + Math.floor(this.duration / 60) : Math.floor(this.duration / 60);
      let s = Math.floor(this.duration % 60) < 10 ? '0' + Math.floor(this.duration % 60) : Math.floor(this.duration % 60);
      let result = m + ':' + s;
      return result;
    },
    // 歌曲播放中的总时长，随着歌曲的进度该表
    updateTotalTime(){
      let m = Math.floor(this.currentTime / 60) < 10 ? '0' + Math.floor(this.currentTime / 60) : Math.floor(this.currentTime / 60);
      let s = Math.floor(this.currentTime % 60) < 10 ? '0' + Math.floor(this.currentTime % 60) : Math.floor(this.currentTime % 60);
      let updateresult = m + ':' + s;
      return updateresult;
    },
    ...mapGetters({
      albumImageUrl: 'albumImage'
    }),
    ...mapState({
      link: (state) => state.lyric.link,
      songmid: (state) => state.lyric.songmid,
      songname: (state) => state.lyric.songname,
      singername: (state) => state.lyric.singername,
    })
    
  },
  watch: {
    // 歌曲自动播放时，监听歌曲播放的位置，并动态更改进度条的位置
    currentTime(){
      let range = (this.currentTime / this.duration) * 100;
      this.width = (range-0.9) + '%';
      // 获取歌曲当前播放的时间，并存储到vuex中
      this.$store.dispatch("getMusicCurrentTime",{currentTime:this.currentTime,totalTime:this.totalTime,updateTotalTime:this.updateTotalTime,audio:this.audio,width:this.width,duration:this.duration,isPlay:this.isPlay});
           
    }
  },
  mounted() {
    // 组件挂载，就获取audio元素
    this.audio = this.$refs.Audio;
    if(this.link){
      this.isPlay = true;
      //切换歌曲时，将进度条宽度设置为0
      this.width = '0%';
    }
    
  },
};
</script>

<style lang="less" scoped>
// footer部分
.footer {
  flex: 0.8;
  .progress {
    width: 854px;
    height: 2px;
    background: rgb(161, 155, 149);
    position: relative;
    .progress-spot {
      position: absolute;
      // width: 0%;
      // width: 0;
      height: 2px;
      background: rgb(165, 38, 86);
      top: 0px;
      i {
        position: absolute;
        top: -9px;
        margin-left: calc(100% - 6px);
        // margin-left: -6px;
        color: rgb(165, 38, 86);
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .audioContainer {
    display: flex;
    align-items: center;
    .musiccover {
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-left: 20px;
      .coverimage-container {
        width: 40px;
        height: 40px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .music-settle {
        margin-left: 20px;
        .music-message {
          font-size: 12px;
          width: 100px;
          height: 20px;
          line-height: 20px;
          margin-bottom: 10px;
          color: rgb(19, 19, 19);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
        .iconitem {
          color: rgba(75, 74, 72, 0.733);
          font-size: 18px;
          margin-right: 10px;
          cursor: pointer;
        }
        .aixin {
          color: rgb(255, 106, 106);
        }
      }
    }
    .playControl-warpper {
      width: 250px;
      margin-top: 10px;
      margin-left: 160px;
      .bofangzanting{
        display: inline-block;
        width: 35px;
        height: 35px;
        line-height: 35px;
        border: 1px solid rgb(165,38,86);
        background: rgb(165,38,86);
        border-radius: 50%;
        margin-right: 10px;
        .bofang{
          padding-left: 7px;
          font-size: 23px;
          color: rgb(223,183,179);
          cursor: pointer;
        }
        .zangting{
          padding-left: 6px;
          font-size: 23px;
          color: rgb(223,183,179);
          cursor: pointer;
        }
      }
      .playitem{
        margin-right: 10px;
        font-size: 22px;
        cursor: pointer;
      }
      
    }
    .timeContainer{
      margin-left: 70px;
      margin-top: 10px;
      font-size: 12px;
      color: rgb(84, 78, 78);
    }
  }
}
</style>