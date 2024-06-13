<script setup>
import {ref} from "vue";
import {Vue3Lottie} from 'vue3-lottie'
import animaData from '@/assets/lottie/Animation1.json'
import {ipcApiRoute} from "@/api/main";
import {ipc} from '@/utils/ipcRenderer';
import md5 from 'MD5'
import {useRouter} from "vue-router";

const formState = ref({
  username: null,
  password: null
})
const router = useRouter();
const login = ()=>{
  ipc.request(ipcApiRoute.login,{loginName:formState.value.username,loginPass:md5(formState.value.password)}).then(res=>{
    router.push("/scales")
  })
}
</script>

<template>

  <div class="container">
    <div class="left-bg"></div>
    <div class="right-bg"></div>
  </div>
  <vue3-lottie :animation-data="animaData" class="login-anima"/>
  <h2 class="login-title">称&nbsp;&nbsp;重</h2>
  <div class="login">
    <a-input v-model:value="formState.username" class="login-input" placeholder="用户名"/>
    <a-input-password v-model:value="formState.password" class="login-input" placeholder="密码"/>
    <a-button type="primary" html-type="submit" class="login-button" @click="login">登录</a-button>
  </div>


</template>

<style scoped>

.login-anima {
  width: 800px;
  height: 100%;
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0px;
}

.login-title {
  position: absolute;
  top: 25%;
  left:76.5%;
  z-index: 10;
  font-size: 48px;
  color: white;
}

.container {
  height: 100%;
  width: 100%;
  display: flex;
  z-index: 5;

  .left-bg {
    width: 60%;
    height: 100%;
    background-color: white;
  }

  .right-bg {
    width: 40%;
    height: 100%;
    background-color: #07C160;
  }
}

.login-input {
  border-radius: 5px;
  font-size: 16px;
  background: white;
  width: 100%;
  border: none;
  padding: 10px 10px;
  margin: 15px 0px;

  &:focus {
    box-shadow: 0 0 0 2px rgba(255, 138, 5, 0.32)
  }

}

.ant-input-affix-wrapper-focused {
  box-shadow: 0 0 0 2px rgba(255, 138, 5, 0.32)
}

.login-button {
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  width: 80px;
  border: 0;
  margin-top: 10px;
  border-radius: 5px;
  transition: background-color 300ms;
  float: left;
}

.login {
  overflow: hidden;
  background-color: white;
  padding: 40px 30px 30px 30px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 80%;
  width: 400px;
  transform: translate(-50%, -50%);
  transition: transform 300ms, box-shadow 300ms;
  box-shadow: 5px 10px 10px rgba(2, 128, 144, 0.2);
  z-index: 10;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 40% 45% 40% 35%;
    z-index: -1;
  }

  &::before {
    left: 40%;
    bottom: -130%;
    background-color: rgba(69, 105, 144, 0.15);
    animation: wawes 6s infinite linear;
  }

  &::after {
    left: 35%;
    bottom: -125%;
    background-color: rgba(2, 128, 144, 0.2);
    animation: wawes 7s infinite
  }

}

@keyframes wawes {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
