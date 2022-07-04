<template>
  <div class="aside">
    <div class="logo">
      <div class="logo-text">
        <span>QQ音乐</span>
      </div>
    </div>
    <div class="aside-content">
      <div class="online-music">
        <div class="online-title title">
          <span>在线音乐</span>
        </div>
        <ul class="online-list music">
          <li>
            <span class="iconfont icon-tuijian"></span>
            <a href="javascript:;">推荐</a>
          </li>
          <li>
            <span class="iconfont icon-yinle"></span>
            <a href="javascript:;">音乐馆</a>
          </li>
          <li>
            <span class="iconfont icon-shipinbofang"></span>
            <a href="javascript:;">视频</a>
          </li>
          <li>
            <span class="iconfont icon-diantai"></span>
            <a href="javascript:;">电台</a>
          </li>
        </ul>
      </div>
      <div class="my-music">
        <div class="mymusic-title title">
          <span>我的音乐</span>
        </div>
        <ul class="my-list music" >
          <li @click="updateBackgroundColor" ref="mylove">
            <span class="iconfont icon-aixin"></span>
            <router-link to="/myfavouritemusic">我喜欢</router-link>
          </li>
          <li>
            <span class="iconfont icon-bendi"></span>
            <a href="javascript:;">本地和下载</a>
          </li>
          <li>
            <span class="iconfont icon-shouye_zuijinbofang_"></span>
            <a href="javascript:;">最近播放</a>
          </li>
          <li>
            <span class="iconfont icon-shitingliebiao"></span>
            <a href="javascript:;">试听列表</a>
          </li>
          <li>
            <span class="iconfont icon-yigouyinle40"></span>
            <a href="javascript:;">已购音乐</a>
          </li>
        </ul>
      </div>
      <div class="created-list">
        <div class="title">
          <span>创建的歌单</span>
        </div>
        <ul class="year-list music">
          <li>
            <a href="#" title="秋风扫落叶的年度歌单">秋风扫落叶的年度歌单</a>
          </li>
          <li>
            <a href="#">新建歌单</a>
          </li>
        </ul>
      </div>
      <div class="collect-list">
        <div class="title">
          <span>收藏的歌单</span>
        </div>
        <ul class="year-list music">
          <li>
            <a href="#" title="秋风扫落叶的年度歌单">秋风扫落叶的年度歌单</a>
          </li>
          <li>
            <a href="#">新建歌单</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'MusicAside',
    
    methods: {
      updateBackgroundColor(){
        
        let element = this.$refs.mylove;
        if(this.routePath === '/myfavouritemusic'){
          element.style.backgroundColor = 'rgb(207, 179, 173)';
        }
        
      }
    },
    computed:{
      routePath(){
        return this.$route.path;
      }
    },
    watch:{
      // 监听路由路径，如果路径不等于我喜欢界面的路径，则将我喜欢的高亮样式取消
      routePath(value){
        if(value!=='/myfavouritemusic'){
          this.$refs.mylove.style.backgroundColor = "";
        }
        
      }
    }
}
</script>

<style lang="less" scoped>
    .aside {
    flex: 1;
    background: rgb(253, 209, 203);
    opacity: 0.8;
    //设置为弹性容器
    display: flex;
    flex-direction: column;
    .logo {
        flex: 1;

        .logo-text {
            margin: 30px 60px;
            color: rgb(0, 0, 0);
            font-family: cursive;
            font-size: 20px;
        }
    }

    .aside-content {
        overflow-y: scroll;
        flex: 7;

        .title {
            color: rgb(0, 0, 0);
            font-family: cursive;
            font-size: 14px;
            margin: 20px 30px;
        }

        .music {
            a {
                text-decoration: none;
                color: rgb(0, 0, 0);
                font-family: cursive;
                font-size: 16px;
            }

            li {
                width: 180px;
                height: 30px;
                margin: 10px 13px;
                line-height: 30px;
                border-radius: 5px;
            }

            li:hover {
                background: rgb(207, 179, 173);
            }
            span {
                padding-left: 15px;
                padding-right: 5px;
            }
        }

        .year-list {
            a {
                // 隐藏多余的文字
                display: block;
                width: 100px;
                white-space: nowrap;
                overflow: hidden; //隐藏溢出的部分
                text-overflow: ellipsis; //显示省略号来代表隐藏的文本
                padding-left: 15px;
            }


        }
    }

    // 自定义设置滚动条
    // 平常状态隐藏滚动条
    .aside-content::-webkit-scrollbar {
        display: none;
    }

    // 当鼠标移入侧边栏时，使滚动条出现
    .aside-content:hover::-webkit-scrollbar {
        display: block;
    }

    .aside-content::-webkit-scrollbar {
        width: 0.5em;
    }

    .aside-content::-webkit-scrollbar-thumb {
        border-radius: 0.25em;
        background: rgb(202, 177, 164);
    }

}
</style>