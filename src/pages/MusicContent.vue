<template>
  <div class="content">
    <div class="nav-search">
      <div>歌曲</div>
      <div>视频</div>
      <div>专辑</div>
      <div>歌单</div>
      <div>歌词</div>
      <div>歌手</div>
      <div>用户</div>
    </div>
    <div class="tool-bar">
      <div class="tool-item bgcolor" >
        <i class="iconfont icon-24gl-play"></i>
        播放全部
      </div>
      <div class="tool-item">
        <i class="iconfont icon-xiazai"></i>
        下载
      </div>
      <div class="tool-item">
        <i class="iconfont icon-ic_batch_default24px"></i>
        批量操作
      </div>
    </div>
    <div class="music-list-container">
      <div class="music-list-title">
        <div class="title-item">歌曲</div>
        <div class="title-item">歌手</div>
        <div class="title-item">专辑</div>
        <div class="title-item">时长</div>
      </div>
      <div class="music-list">
        <div class="music-item" v-for="(music,key) in musicList" :key="key">
          <div class="music-name" :title="music.lyric_hilight">
            <i class="iconfont icon-aixin"></i>
            <span>{{music.songname}}</span>
            <span>{{music.lyric}}</span>
          </div>
          <div class="music-mod-menu">
            <a href="#" title="播放" @click="playMusic(music.songmid,music.songname,music.singer)">
              <i class="iconfont icon-24gl-play"></i>
            </a>
            <a href="#" title="添加到">
              <i class="iconfont icon-tianjiadao"></i>
            </a>
            <a href="#" title="下载">
              <i class="iconfont icon-xiazai"></i>
            </a>
            <a href="#" title="更多操作">
              <i class="iconfont icon-gengduocaozuo"></i>
            </a>
          </div>
          <div class="music-songer" >
            <!-- <span>{{music.singer[0].name}}</span> -->
            <span v-for="(songer,key) in music.singer " :key="key" >{{ songer.name }} </span>
          </div>
          <div class="music-ablum">
            <span :title="music.albumname">{{music.albumname}}</span>
          </div>
          <div class="music-time">
            <span>{{getFormatTime(music.interval)}}</span>
          </div>
        </div>
       
      </div>
    </div>
    <!-- <LoginInterface></LoginInterface> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoginInterface from '@/components/LoginInterface'
export default {
  name: "MusicContent",
  components: {LoginInterface},
  data() {
    return {
      
    }
  },
  computed: {
   
    ...mapState({
      musicList: (state)=>state.search.List
    })
  },
  methods: {
    
    playMusic(songmid,songname,singername){
      this.$store.dispatch("getLinkAndAlbum",{songmid:songmid,songname:songname,singername:singername});
       
    },
    // 将时间格式化为00:00的形式
    getFormatTime(time){
      let m = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60);
      let s = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);
      return m + ':' + s;
    }
  },
  
  
  
};
</script>

<style lang="less" scoped>
// content部分
.content {
  flex: 7;
  overflow-y: scroll;
  .nav-search {
    display: flex;
    align-items: center;
    height: 40px;
    width: 420px;
    margin-left: 16px;
    justify-content: space-around;
    color: rgb(55, 53, 53);
    font-size: 15px;
  }

  .tool-bar {
    width: 450px;
    display: flex;
    font-size: 15px;
    margin-left: 25px;

    .tool-item {
      width: 130px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid rgb(229, 189, 188);
      border-radius: 15px;
      background-color: rgb(229, 189, 188);
      margin-right: 20px;
      font-size: 14px;
      cursor: pointer;
    }
    .tool-item:hover{
      background-color: rgb(205, 173, 173);
    }
    .bgcolor{
      background-color: rgb(157,36,82);
      color: rgb(240, 224, 224);
    }
    .bgcolor:hover{
      background-color: rgb(164, 27, 79);
    }
  }

  .music-list-title {
    display: flex;
    margin-top: 20px;
    margin-left: 46px;
    margin-bottom: 20px;
    align-items: center;
    font-size: 12px;
    color: rgb(51, 45, 45);
    .title-item:first-child {
      width: 360px;
    }

    .title-item:nth-child(2) {
      width: 150px;
    }

    .title-item:nth-child(3) {
      width: 190px;
    }
    .title-item:nth-child(4){
      width: 100px;
    }
  }

  .music-list {
    .music-item {
      margin: 0 36px;
      display: flex;
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      color: rgba(36, 35, 33, 0.868);
      .music-name {
        width: 312px;
        // width: 350px;
        margin-right: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 10px;
        i {
          padding-right: 9px;
          color: rgb(239, 87, 87);
        }
        span:nth-of-type(2){
          padding-left: 4px;
        }
      }

      .music-mod-menu {
        // visibility: hidden;
        display: none;
        width: 148px;
        text-align: center;
        
        a {
          text-decoration: none;
          color: rgb(109, 99, 99);
          padding: 3px;
        }
      }

      .music-songer {
        width: 150px;
      }

      .music-ablum {
        width: 187px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .music-item:hover {
      background-color: rgb(229, 189, 188);
    }
    .music-item:hover .music-mod-menu {
      display: block;
    }
    .music-item:hover .music-name {
      width: 164px;
    }
  }
}
// 自定义设置content部分的滚动条
// 平常状态隐藏滚动条
// .content::-webkit-scrollbar {
//     display: none;
// }

// 当鼠标移入侧边栏时，使滚动条出现
.content:hover::-webkit-scrollbar {
  display: block;
}

.content::-webkit-scrollbar {
  width: 0.5em;
}

.content::-webkit-scrollbar-thumb {
  border-radius: 0.25em;
  background: rgb(202, 177, 164);
}
</style>