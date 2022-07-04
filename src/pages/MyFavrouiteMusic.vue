<template>
  <div class="musicLove-container" >
    <h1>我喜欢</h1>
    <div class="nav-search">
      <div>歌曲</div>
      <div>歌单</div>
      <div>专辑</div>
      <div>主播电台</div>
      <div>视频</div>
    </div>
    <div class="tool-bar">
      <div class="tool-item bgcolor">
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
        <div class="music-item" v-for="(music,key) in LoveMusicList" :key="key">
          <div class="music-name" :title="music.songorig">
            <i class="iconfont icon-aixin"></i>
            <span>{{music.songname}}</span>
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
  </div>
</template>

<script>
import {reqGetUserHomePage,reqGetMusicListInfo} from '@/api/index'
import { mapState, mapGetters } from "vuex";
export default {
  name: "MyFavrouiteMusic",
  computed: {
    ...mapGetters({
      Creator: "Creator",
    }),
    ...mapState({
      LoveMusicList: (state) => state.userinfo.LoveMusicList,
    }),
  },
  methods: {
    // 将时间格式化为00:00的形式
    getFormatTime(time){
      let m = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60);
      let s = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);
      return m + ':' + s;
    },
    playMusic(songmid,songname,singername){
      this.$store.dispatch("getLinkAndAlbum",{songmid,songname,singername});
    },
    
  },
  async mounted() {
    //获取登录的用户信息
    let resultInfo = await reqGetUserHomePage(2528874160);
    // console.log(resultInfo);
    // console.log(resultInfo.data.data);
    if(resultInfo.data.data.result === 301 ){
      alert('登录异常，请尝试重新登录')
    }else{
      this.$store.dispatch('getUserInfo',resultInfo.data.data);
      if(this.Creator.myloveid){
        let result = await reqGetMusicListInfo(this.Creator.myloveid);
        // console.log(result.data.data.songlist);
        this.$store.dispatch('getMyLoveMusicList',result.data.data.songlist)
      }
    }
    
  
  }
};
</script>

<style lang="less" scoped>
.musicLove-container {
  flex: 7;
  overflow-y: scroll;
  h1 {
    font-size: 30px;
    margin-left: 30px;
  }
  .nav-search {
    display: flex;
    align-items: center;
    height: 40px;
    width: 420px;
    margin-left: 16px;
    margin-top: 15px;
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
    .tool-item:hover {
      background-color: rgb(205, 173, 173);
    }
    .bgcolor {
      background-color: rgb(157, 36, 82);
      color: rgb(240, 224, 224);
    }
    .bgcolor:hover {
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
        cursor: pointer;
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
        cursor: pointer;
        a {
          text-decoration: none;
          color: rgb(109, 99, 99);
          padding: 3px;
        }
      }

      .music-songer {
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }

      .music-ablum {
        width: 187px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
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
// 当鼠标移入侧边栏时，使滚动条出现
.musicLove-container::-webkit-scrollbar {
  display: block;
}

.musicLove-container::-webkit-scrollbar {
  width: 0.5em;
}

.musicLove-container::-webkit-scrollbar-thumb {
  border-radius: 0.25em;
  background: rgb(202, 177, 164);
}
</style>