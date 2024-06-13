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
        @click="changeMenu">
        <a-menu-item v-for="(menuInfo, subIndex) in menu" :key="subIndex">
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
import { ref,onBeforeMount,watch,onMounted,defineProps } from 'vue';
import {useRouter} from "vue-router";
import subMenu from '@/router/subMenu';

const menu = ref({})
const current=ref('menu_100')
const  keys = ref([])
const props = defineProps(['id'])

const router = useRouter()
const menuHandle = ()=> {
  menu.value = subMenu[props.id];
  const linkInfo = menu.value[current.value];
  router.push({ name: linkInfo.pageName, params: linkInfo.params});
}
const changeMenu = (e)=> {
  current.value = e.key;
}

watch(()=>{props.id},(newValue,oldValue)=>{
  current.value = 'menu_100';
  menuHandle();
})


onMounted(()=>{
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
