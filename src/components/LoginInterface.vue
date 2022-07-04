<template>
  <div class="logininterface" v-if="isShow">
    <span class="iconfont icon-guanbi closebtn" @click="isShow = false"></span>
    <h2>QQ登录</h2>
    <h1>密码登录</h1>
    <input type="text" class="inputlogin" placeholder="请输入账号" v-model="acount"/>
    <input type="password" class="inputlogin" placeholder="请输入密码" v-model="password"/>
    <button class="btn" @click="startLogin">登录</button>
    <div class="footarea">
      <span>找回密码</span>
      <span>注册账号</span>
      <span>意见反馈</span>
    </div>
  </div>
</template>

<script>
import {reqGetUserCookie} from '@/api/index'
export default {
  name: "LoginInterface",
  data(){
    return {
        acount:'',
        password:'',
        isShow: false,
    }
  },
  methods: {
    async startLogin(){
        if(!this.acount && !this.password){
            alert("输入账号不能为空，请输入正确的账号和密码")
        }else{
            //登录
            let result = await reqGetUserCookie(this.acount);
            // console.log(result)
            if(result.status == 200){
                this.isShow = false
                // console.log(this.isShow)
               
                this.$bus.$emit('jugdeLogin',false)
            }
            
        }
        
    }
  },
  mounted(){
    // 登录事件，判断登录框是否出现
    this.$bus.$on('judgeShow',(data)=>{
        this.isShow = data;
    })
  }
};
</script>

<style lang="less" scoped>
.logininterface {
  width: 500px;
  height: 400px;
  background-color: white;
  border-radius: 15px;
  position: absolute;
  top: 150px;
  left: 50px;
  .closebtn {
    display: inline-block;
    margin-top: 10px;
    margin-left: 470px;
    cursor: pointer;
  }
  h2 {
    margin: 15px 220px;
  }
  h1 {
    margin: 50px 218px;
  }
  .inputlogin {
    width: 200px;
    height: 35px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: block;
    margin: 10px 160px;
    padding: 0 15px;
  }
  .btn {
    width: 200px;
    height: 35px;
    margin: 20px 160px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #169ff4;
    color: #fff;
    cursor: pointer;
  }
  .footarea {
    width: 300px;
    margin-left: 150px;
    margin-top: 35px;
    font-size: 12px;
    span {
      padding-right: 40px;
      cursor: pointer;
      color: rgb(45, 43, 43);
    }
  }
}
</style>