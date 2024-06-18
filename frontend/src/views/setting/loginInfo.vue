<script setup>

import {ipc} from "@/utils/ipcRenderer";
import {ipcApiRoute} from "@/api/main";
import {useRouter} from "vue-router";
import { h } from 'vue';
import { LoginOutlined } from '@ant-design/icons-vue';
import useUserStore from "@/store/modules/user";

const router = useRouter();
const userStore = useUserStore()
const logout = ()=>{
  ipc.request(ipcApiRoute.logout).then(res=> {
        router.push("/login")
      }
  )
}
</script>

<template>
  <a-flex justify="center" align="center" style="height: 100%;width: 100%">
    <a-card hoverable style="width: 300px">
      <template #cover>
        <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </template>
      <template #actions>
        <a-tooltip title="退出登录">
          <a-button type="primary" shape="circle" :icon="h(LoginOutlined)" @click="logout"/>
        </a-tooltip>
      </template>
      <a-card-meta :title="userStore.name" description="xxx实验室">
        <template #avatar>
          <a-avatar src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
        </template>
      </a-card-meta>
    </a-card>
  </a-flex>
</template>

<style scoped>

</style>
