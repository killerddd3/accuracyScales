<template>
  <a-layout id="app-layout-sider">
    <a-layout-sider
        v-model="collapsed"
        theme="light"
        class="layout-sider"
        width="100"
    >
      <div class="logo">
        <img class="pic-logo" src="~@/assets/logo.png">
      </div>
      <a-menu
          class="menu-item"
          theme="light"
          mode="inline"
          :selectedKeys="[current]"
          @click="menuHandle"
      >
        <a-menu-item v-for="(menuInfo, index) in menu" :key="index">
          <icon-font :type="menuInfo.icon" />
          {{ menuInfo.title }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import {ref,onMounted,reactive} from 'vue'
import {useRouter} from "vue-router";

const collapsed = ref(true)
const current = ref('menu_1')
const menu = reactive({
  'menu_1' : {
    icon: 'icon-fengche',
    title: '称重',
    pageName: 'Scales',
    params: {
      // test: 'hello'
    },
  },
})

const router = useRouter()
const  menuHandle = (e)=> {
  if(!!e){
    current.value = e.key
  }
  const linkInfo = menu[current.value]
  router.push({ name: linkInfo.pageName, params: linkInfo.params})
}

onMounted(()=>{
  menuHandle()
})

</script>
<style lang="less" scoped>
// 嵌套
#app-layout-sider {
  height: 100%;
  .logo {
    border-bottom: 1px solid #e8e8e8;
  }
  .pic-logo {
    height: 32px;
    //background: rgba(139, 137, 137, 0.2);
    margin: 10px;
  }
  .layout-sider {
    border-top: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
  }
  .menu-item {
    .ant-menu-item {
      background-color: #fff;
      margin-top: 0px;
      margin-bottom: 0px;
      padding: 0 0px !important;
    }
  }
  .layout-content {
    //background-color: #fff;
  }
}
</style>
