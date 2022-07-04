<template>
  <Header class="header">
    <!-- 搜索框部分 -->
    <div class="search-music">
      <!-- 回退与前进按钮 -->
      <div class="backforward">
        <span class="iconfont icon-icon-jiantou2"></span>
        <span class="iconfont icon-icon-jiantou1"></span>
      </div>
      <!-- 搜索栏 -->
      <div class="input-search">
        <input
          type="text"
          class="custom-input-box"
          placeholder="搜索音乐"
          ref="search"
          v-on:focus="changePlaceholderDisappear"
          v-on:blur="changePlaceholderAppear"
          v-model="inputKey"
          @keyup.enter="handleKey"
        />
      </div>
      <div class="listen-song">
        <span class="iconfont icon-tinggeshiqu1"></span>
      </div>
    </div>
    <div class="login">
      <div class="alreadylogin" v-show="!isLogin">
        <div class="avatar" @click="goToUserHomePage">
          <img src="../../public/images/avator.png" alt="头像" />
        </div>
        <div class="nickname">秋风扫落叶</div>
        <span class="downArrow iconfont icon-down_arrow" @click="quit = !quit"></span>
        <div class="quitLogin" v-if="quit" @click="QuitLogin">
            <span>退出登录</span>
        </div>
      </div>
      
      <!-- 未登录状态 -->
      <div class="unlogin" v-show="isLogin">
        <div class="avatar">
          <img src="../../public/images/avator.png" alt="头像">
        </div>
        <div class="nickname" @click="getUserCookie">点击登录</div>
      </div>
    </div>
    <!-- 工具部分 -->
    <div class="tool">
      <span class="iconfont icon-pifu"></span>
      <span class="iconfont icon-caidan"></span>
      <span class="line"></span>
      <span class="iconfont icon-jingjianmoshi"></span>
      <span class="iconfont icon-suoxiao"></span>
      <span class="iconfont icon-zuidahua"></span>
      <span class="iconfont icon-guanbi"></span>
    </div>
  </Header>
</template>

<script>
import {reqGetUserCookie , reqSetUserCookie,reqCurrentCookie,reqSongMsg} from '@/api/index'
import {mapGetters} from 'vuex';
export default {
    name: "MusicHeader",
    data(){
      return {
        inputKey: '',//搜索的关键字
        data: {
          data:"pgv_pvi=8759464960; pgv_pvid=4013931218; tvfe_boss_uuid=9736e1d29119d6be; RK=bTL92H/W9I; ptcz=3f3316c8b10059dbb2804d4795c7d746b36f0758d10bae64dac8dbbe65cb627e; o_cookie=2528874160; fqm_pvqid=3b290cde-b516-4503-b18e-a7cd49e9f67c; ts_uid=3123496063; eas_sid=r1e6X486A5l5N2Q8c5Q9S9H1V1; pac_uid=1_2528874160; tmeLoginType=2; euin=ow4ANecl7e6son**; ts_refer=cn.bing.com/; fqm_sessionid=ac764e66-4e37-461f-9614-0b48589b00e1; pgv_info=ssid=s7511071713; ts_last=y.qq.com/; _qpsvr_localtk=0.34937687833505393; login_type=1; wxunionid=; qqmusic_key=Q_H_L_5FR9aMztURQGXgLgFZHaFonMq1t-pb2hBC_TxRJpqhecfoKOjW5fXBw; psrf_access_token_expiresAt=1664692222; wxopenid=; psrf_qqopenid=1F3338222565B38A2D7C730A698E2BFA; qm_keyst=Q_H_L_5FR9aMztURQGXgLgFZHaFonMq1t-pb2hBC_TxRJpqhecfoKOjW5fXBw; qm_keyst=Q_H_L_5FR9aMztURQGXgLgFZHaFonMq1t-pb2hBC_TxRJpqhecfoKOjW5fXBw; uin=2528874160; psrf_qqrefresh_token=85B13C52B11CC04DB5C5D98E871C88DF; psrf_musickey_createtime=1656916222; psrf_qqaccess_token=3B79545EC00D5E05882DF1D848A87D9B; wxrefresh_token=; psrf_qqunionid=AC262BC0004C93A35EBCD51F355B1E72"
        },
        // 是否是未登录状态，未登录为true,登录为false
        isLogin: true,
        quit: false,
      }
    },
    computed: {
      ...mapGetters({
        Creator: 'Creator'
      })
    },
    methods:{
      changePlaceholderDisappear(){
        let input = this.$refs.search;
        input.placeholder = "";
      },
      changePlaceholderAppear(){
        let input = this.$refs.search;
        input.placeholder = "搜索音乐";
      },
      async handleKey(){
        if(!this.inputKey){
          alert("输入内容不能为空");
        }else{
          let result = await reqSongMsg(this.inputKey);
          console.log(result);
          if(result.status === 200){
            if(result.data.result === 500 || result.data.result === 400){
              alert('服务器错误或者系统异常')
            }else{
              this.$store.dispatch('getMusicList',result.data.data.list)
            }
          }
          this.$router.push({
            path: '/musiccontent'
          })
        }
        
      },
      async getUserCookie(){
        let result = await reqSetUserCookie(this.data);
        // console.log(result);
        // 弹出登录框
        if(result.status === 200){
          this.$bus.$emit('judgeShow',true)
        }
        
      },
      // 退出登录
      QuitLogin(){
        // 修改为未登录的状态
        this.isLogin = true;
      },
      goToUserHomePage(){
        
        this.$router.push({
          path: '/userhomepage'
        })
      }
    },
    async mounted(){
      // 查看当前用户的cookie
      let result = await reqCurrentCookie()
      if(result.data.data){
        // 当组件挂载完毕后，如果存在cookie，则修改登录状态为已登录
        this.isLogin = false;
      }
      // console.log(result.data.data);
      // 如果在登录界面，登录成功，则修改isLogin的值，将未登录状态修改为登录状态
      this.$bus.$on('jugdeLogin',(data)=>{
        this.isLogin = data;
        // 将退出登录界面隐藏
        this.quit = data;
      })
      // this.$bus.$on('loginFailure',(data)=>{
      //   this.isLogin = data;
      // })
    }
};
</script>

<style lang="less" scoped>
    // header部分
    .header {
        flex: 1;
        display: flex;
        // 搜索框部分
        .search-music {
            width: 300px;
            display: flex;
            align-items: center;

            // 前进后退按钮
            .backforward {
                margin: 0 17px 0 22px;

                span {
                    margin: 0 8px;
                }
                span:nth-of-type(2){
                  padding-left: 5px;
                }
            }

            // 输入框
            .input-search {

                // 自定义input样式
                .custom-input-box {
                    outline: none;
                    box-sizing: border-box;
                    border: 1px solid transparent;
                    width: 160px;
                    height: 35px;
                    border-radius: 15px;
                    background-color: rgb(229, 189, 188);
                    padding: 0 15px;
                }

                // 自定义聚焦样式
                .custom-input-box:focus {
                    border-color: transparent;
                }

                ::-webkit-input-placeholder {
                    font-size: 10px;
                }
            }

            .listen-song {
                margin-left: 15px;
                cursor: pointer;
            }
            .listen-song:hover{
              color: rgb(157,36,82);
            }
        }

        // 登录部分
        .login {
            width: 200px;
            display: flex;
            align-items: center;
            // margin-left: 100px;
            padding-left: 100px;
            position: relative;

            .alreadylogin,.unlogin {
                display: flex;

                // 头像
                .avatar {
                    width: 25px;
                    height: 25px;
                    margin-right: 10px;
                    cursor: pointer;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }

                // 昵称
                .nickname {
                    line-height: 25px;
                    font-size: 12px;
                    color: rgb(159, 135, 134);
                    cursor: pointer;
                }
                .downArrow{
                  margin-top: 3px;
                  margin-left: 5px;
                  color: rgb(139, 127, 127);
                  cursor: pointer;
                }
                .downArrow:hover{
                  color: rgb(157,36,82);
                }
                
            }
           .unlogin{
            margin-left: 100px;
           }
           .quitLogin{
            position: absolute;
            z-index: 999;
            width: 100px;
            height: 30px;
            line-height: 30px;
            border: 1px solid rgb(207, 179, 179);
            border-radius: 5px;
            box-shadow: 0 0 5px rgb(207, 179, 179);
            text-align: center;
            font-size:12px;
            top: 60px;
            left: 160px;
            span{
              cursor: pointer;
            }
           }
        }

        // 工具条
        .tool {
            flex: 2;
            display: flex;
            align-items: center;
            // padding-left: 50px;

            span {
                margin-left: 15px;
                cursor: pointer;
            }
            span:hover{
              color: rgb(157,36,82);
            }
            .line {
                width: 2px;
                height: 18px;
                background-color: rgb(159, 135, 134);
            }
        }
    }
</style>