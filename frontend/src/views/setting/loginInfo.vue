<script setup>

import {ipc} from "@/utils/ipcRenderer";
import {ipcApiRoute} from "@/api/main";
import {useRouter} from "vue-router";
const router = useRouter();
const logout = ()=>{
  ipc.request(ipcApiRoute.logout).then(res=> {
        router.push("/login")
      }
  )
}
</script>

<template>
<a-button @click="logout">退出</a-button>
</template>

<style scoped>

</style>
