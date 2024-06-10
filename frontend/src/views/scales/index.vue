<template>
  <div class="container">
    <a-form
        :model="queryParams"
        layout="inline"
        autocomplete="off"
    >
      <a-form-item
          label="仪器"
          name="device"
          :rules="[{ required: true, message: '请选择仪器' }]"
      >
        <a-select
            ref="select"
            style="width: 120px"
            placeholder="仪器选择"
            v-model:value="queryParams.device"
        >
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
          label="仪器条码"
          name="deviceCode"
          :rules="[{ required: true, message: '请选择仪器条码' }]"
      >
        <a-select
            ref="select"
            style="width: 120px"
            placeholder="仪器条码选择"
            v-model:value="queryParams.deviceCode"
        >
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
          label="串口号"
          name="serialPort"
          :rules="[{ required: true, message: '请选择串口号' }]"
      >
        <a-select
            ref="select"
            style="width: 120px"
            placeholder="串口号选择"
            v-model:value="queryParams.serialPort"
        >
          <a-select-option v-for="item in serialPortList" :value="item.path">{{item.path}}</a-select-option>
        </a-select>
      </a-form-item>


      <a-form-item>
        <a-button type="primary" html-type="submit" @click="connect">连接</a-button>
      </a-form-item>
    </a-form>

<!--    <a-button type="primary" @click="open">开始采集</a-button>-->

  </div>
</template>
<script setup>
import {  ref,onMounted } from 'vue';
import {ipcApiRoute} from "@/api/main";
import {ipc} from '@/utils/ipcRenderer';
import { message } from 'ant-design-vue';
const queryParams = ref({
  device:null,
  deviceCode:null,
  serialPort:null,
})
const deviceList = ref([])
const deviceCodeList = ref([])
const serialPortList = ref([])

onMounted(()=>{
  getSerialPortList()
  init()
})
const getSerialPortList = ()=>{
  ipc.invoke(ipcApiRoute.getSerialPortList,{}).then(data=>{
    serialPortList.value = data
  })
}

const connect = ()=>{
  ipc.invoke(ipcApiRoute.connect,{path:queryParams.value.serialPort,baudRate:9600}).then(data=>{
    message.success('连接成功');
  })
}

const open = ()=>{
  ipc.invoke(ipcApiRoute.open)
}

const receive = ()=>{
  ipc.removeAllListeners(ipcApiRoute.receive);
  ipc.on(ipcApiRoute.receive,(event, result)=>{
    console.log(result)

  })
}

const init = ()=> {
  receive()
}


</script>
<style scoped>
.container{
  padding: 10px;
}
</style>
