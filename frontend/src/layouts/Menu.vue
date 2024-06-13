<template>
  <a-layout id="app-menu">
    <a-layout-sider
      theme="light"
      class="layout-sider"
      width="120"
    >
      <a-menu
        theme="light"
        mode="inline"
        :selectedKeys="[current]"
        @click="menuHandle">
        <a-menu-item v-for="(menuInfo, subIndex) in currentMenu" :key="subIndex">
          <router-link :to="{ name: menuInfo.pageName, params: menuInfo.params}">
            <span>{{ menuInfo.title }}</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref,watch,onMounted,defineProps,nextTick } from 'vue';
import {useRouter} from "vue-router";
const props = defineProps(['id'])
const subMenu = ref({
  Scales:[
    {
      title: '采样',
      pageName: 'ScalesIndex',
      params: {}
    }
  ],
  Setting:[
    {
      title: '登录信息',
      pageName: 'LoginInfo',
      params: {}
    }
  ]
})
const currentMenu = ref([])
const current=ref(0)


const router = useRouter()
const menuHandle = (e)=> {
  if(!!e){
    current.value = e.key
  }
  const linkInfo = currentMenu.value[current.value];
  router.push({ name: linkInfo.pageName, params: linkInfo.params});
}


const changeParentMenu = ()=>{
  current.value = 0;
  currentMenu.value = subMenu.value[props.id];
}

watch(()=>props.id,(newValue,oldValue)=>{
  changeParentMenu()
  menuHandle();
},{ immediate:true })


onMounted(()=>{
  changeParentMenu()
  menuHandle();
})
</script>
<style lang="less" scoped>
#app-menu {
  height: 100%;
  text-align: center;
  .layout-sider {
    border-top: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    background-color: #FAFAFA;
    overflow: auto;
  }
}
</style>
