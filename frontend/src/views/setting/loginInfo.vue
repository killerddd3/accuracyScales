<script setup>

import {ipc} from "@/utils/ipcRenderer";
import {ipcApiRoute} from "@/api/main";

const logout = ()=>{
  ipc.invoke(ipcApiRoute.logout)
}
</script>

<template>
<a-button @click="logout">退出</a-button>
</template>

<style scoped>

</style>
