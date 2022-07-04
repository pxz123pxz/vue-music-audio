<template>
  <transition name="transitionLyric" appear>
    <div class="lyric-container" v-show="isShowLyric">
      <div class="tool-bar">
        <span class="iconfont icon-down_arrow" @click="changeIsShow"></span>
        <span class="iconfont icon-suoxiao"></span>
        <span class="iconfont icon-zuidahua"></span>
        <span class="iconfont icon-guanbi"></span>
      </div>
      <div class="coverMusicContainer">
        <div class="music-cover">
          <img :src="albumImageUrl" alt="专辑封面" />
        </div>
        <div class="music-lyric">
          <div class="lyric-name" :title="MusicMsg[0]">{{ MusicMsg[0] }}</div>
          <div class="lyric-songer" :title="MusicMsg[1]" v-show="LyricList.length !== 0" >歌手：{{ MusicMsg[1] }}
          </div>
          <div
            class="lyric-ablum" :title="MusicMsg[2]" v-show="LyricList.length !== 0">专辑：{{ MusicMsg[2] }} </div>
          <ul class="lyric-list" ref="lyricUL">
            <li ref="lyric" class="lyric-item text" :class="{ load: lyricindex === index ? true : false }" v-for="(item, index) in LyricList" :key="index" v-show="item.words" :data-index="index">{{ item.words }}</li>
          </ul>
        </div>
      </div>
      <div class="footer-wrapper">
        <!-- 进度条 -->
        <div class="progress" @click="changeProgess">
          <div class="progress-spot" :style="{ width: width }">
            <i class="iconfont icon-dian"></i>
          </div>
        </div>
        <div class="audioContainer">
          <div class="music-settle">
            <span class="iconfont icon-aixin"></span>
            <span class="iconfont icon-xiazai"></span>
            <span class="iconfont icon-gengduocaozuo"></span>
            <span class="iconfont icon-pinglun"></span>
          </div>
          <!-- 歌曲播放控件部分 -->
          <div class="playControl-warpper">
            <div class="playControl">
              <span class="iconfont icon-24gl-shuffle playitem"></span>
              <span class="iconfont icon-shangyiqu101 playitem"></span>
              <div class="bofangzanting">
                <span class="iconfont icon-24gl-play playitem bofang" v-if="!isPlay" @click="playmusic"></span>
                <span class="iconfont icon-bofangzanting playitem zangting" v-if="isPlay" @click="pausemusic"></span>
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
  </transition>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "MusicLyric",
  data() {
    return {
      isShowLyric: false,
      lyricindex: 0,
      isload: false,
      isDrag: false,
      
    };
  },
  computed: {
    ...mapGetters({
      LyricList: "newLyricList",
      MusicMsg: "musicTitle",
      albumImageUrl: 'albumImage'
    }),
    ...mapState({
      currentTime: (state) => state.lyric.currentTime,
      totalTime: (state) => state.lyric.totalTime,
      updateTotalTime: (state) => state.lyric.updateTotalTime,
      audio: (state) => state.lyric.audio,
      width: (state) => state.lyric.width,
      link: (state) => state.lyric.link,
      duration: (state) => state.lyric.duration,
      isPlay: (state) => state.lyric.isPlay,
    }),
  },
  methods: {
    changeIsShow() {
      this.isShowLyric = false;
    },
   // 点击进度条的某个部分，跳转到相应的播放位置，进度条也随之改变
    changeProgess(e){
      let width = '0%';
      let currentTime = 0;
      e.stopPropagation()
      let currentWidth =((e.clientX - 277) / 960) * 100;
      
      if(currentWidth >= 99){
        width = '99%';
      }else{
        width = currentWidth + '%';
        this.audio.currentTime = ((currentWidth / 100) * this.duration)
        currentTime = ((currentWidth / 100) * this.duration);
      }
      this.$store.dispatch('updateData',{width:width,currentTime:currentTime});
    },
    playmusic(){
      this.audio.play();
    },
    pausemusic(){
      this.audio.pause();
    }
  },
  mounted() {
    this.$bus.$on("showLyric", (data) => {
      this.isShowLyric = data;
    });
  },
  watch: {
    currentTime() {
      let a = 0;
      let time = 0;
      for (let i = 0; i < this.LyricList.length; i++) {
        if (this.currentTime >= parseFloat(this.LyricList[i].time)) {
          const index = this.$refs.lyric[i].dataset.index;
          if (i === parseInt(index)) {
            this.lyricindex = i;
            if (i < this.LyricList.length - 1) {
              time =
                parseInt(this.LyricList[i + 1].time) -
                parseInt(this.LyricList[i].time);
            } else {
              time = 0;
            }

            // console.log(time);
            this.$refs.lyric[i].style.animationDuration = time + "s";

            let height = this.$refs.lyric[i].offsetHeight;

            a += height;
            // console.log(a);
            this.$refs.lyricUL.scrollTop = a;
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.lyric-container {
  width: 1060px;
  height: 700px;
  // box-shadow: 8px 10px 6px 2px rgb(207, 202, 202);
  // background-color: rgb(121, 113, 122);
  background-size: cover;
  position: absolute;
  background: linear-gradient(
    to bottom,
    rgb(250, 250, 250),
    85%,
    rgb(171, 214, 243)
  );
  .tool-bar {
    margin-top: 15px;
    span {
      margin-right: 20px;
      cursor: pointer;
    }
    span:hover {
      color: rgb(86, 113, 195);
    }
    span:nth-of-type(1) {
      margin-right: 910px;
      margin-left: 20px;
    }
  }
  .coverMusicContainer {
    display: flex;
    .music-cover {
      width: 350px;
      height: 340px;
      margin-top: 100px;
      margin-left: 50px;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .music-lyric {
      height: 395px;
      margin-top: 90px;
      margin-left: 190px;
      text-align: center;
      .lyric-name {
        width: 250px;
        margin-bottom: 25px;
        color: rgb(48, 50, 54);
        font-size: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
      .lyric-songer,
      .lyric-ablum {
        text-align: center;
        font-size: 14px;
        margin-bottom: 8px;
        // 隐藏多余的文字
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgb(34, 32, 34);
      }
      .lyric-songer {
        width: 100px;
        margin-left: 80px;
        cursor: pointer;
      }
      .lyric-ablum {
        width: 200px;
        margin-left: 30px;
        cursor: pointer;
      }
      .lyric-list {
        padding-top: 180px;
        // width: 550px;
        width: 300px;
        height: 100px;
        overflow-y: scroll;
        text-align: center;
        // margin-left: -160px;
        margin-left: -24px;
        margin-top: 30px;
        scroll-behavior: smooth;
        .lyric-item {
          line-height: normal; //设置合理的行间距
          color: rgb(34, 32, 34);
          padding-bottom: 20px;
          // white-space: normal;
          // transition: all 0.1s linear;
        }
        // 设置背景，后面文字颜色渐变需要使用
        .text {
          background: rgb(34, 32, 34) -webkit-linear-gradient(
              left,
              skyblue,
              skyblue
            ) no-repeat 0 0;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 0% 100%;
        }
        .load {
          background-size: 100% 100%;
          animation: scan linear;
        }
      }
      .lyric-list::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .footer-wrapper {
    margin-top: 100px;
    // margin-left: 50px;
    .progress {
      margin-left: 45px;
      width: 960px;
      height: 2px;
      background: rgb(164, 185, 204);
      position: relative;
      .progress-spot {
        position: absolute;
        // width: 0%;
        // width: 0;
        height: 2px;
        background: skyblue;
        top: 0px;
        i {
          position: absolute;
          top: -9px;
          margin-left: calc(100% - 6px);
          // margin-left: -6px;
          color: rgb(116, 168, 188);
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
    .audioContainer {
      display: flex;
      // margin-top: 28px;
      margin-left: 23px;
      .music-settle {
        margin-left: 20px;
        margin-top: 28px;
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
        span {
          color: rgba(75, 74, 72, 0.733);
          font-size: 18px;
          margin-right: 10px;
          cursor: pointer;
        }
        span:nth-of-type(1) {
          color: rgb(255, 106, 106);
        }
      }
      .playControl-warpper {
      width: 250px;
      margin-top: 20px;
      margin-left: 300px;
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
      margin-left: 200px;
      margin-top: 28px;
      font-size: 12px;
      color: rgb(84, 78, 78);
    }
    }
  }
}
// 设置动画，关键帧
@keyframes scan {
  0% {
    background-size: 28% 100%;
  }
  100% {
    background-size: 90% 100%;
  }
}
.transitionLyric-enter,
.transitionLyric-leave-to {
  transform: translateY(100%);
}
.transitionLyric-enter-active,
.transitionLyric-leave-active {
  transition: 0.3s ease-in-out;
}
.transitionLyric-enter-to,
.transitionLyric-leave {
  transform: translateY(0);
}
</style>