<template>
  <div class="container">
    <a-form
        ref="deviceFormRef"
        :model="deviceQueryParams"
        layout="inline"
        autocomplete="off"
    >
      <a-form-item
          label="仪器"
          name="device"
          :rules="[{ required: true, message: '请选择仪器' }]"
      >
        <a-select
            :disabled="isConnect"
            ref="select"
            style="width: 120px"
            placeholder="仪器选择"
            v-model:value="deviceQueryParams.device"
        >
          <a-select-option v-for="item in deviceList" :value="item.deviceId">{{item.deviceName}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
          label="仪器条码"
          name="deviceCode"
          :rules="[{ required: true, message: '请选择仪器条码' }]"
      >
        <a-select
            :disabled="isConnect"
            ref="select"
            style="width: 120px"
            placeholder="仪器条码选择"
            v-model:value="deviceQueryParams.deviceCode"
        >
          <a-select-option v-for="item in deviceList" :value="item.deviceId">{{item.deviceId}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
          label="串口号"
          name="serialPort"
          :rules="[{ required: true, message: '请选择串口号' }]"
      >
        <a-select
            :disabled="isConnect"
            ref="select"
            style="width: 120px"
            placeholder="串口号选择"
            v-model:value="deviceQueryParams.serialPort"
        >
          <a-select-option v-for="item in serialPortList" :value="item.path">{{ item.path }}</a-select-option>
        </a-select>
      </a-form-item>


      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit" v-if="!isConnect" @click="connect">连接</a-button>
          <a-button type="primary" html-type="submit" v-if="isConnect" @click="close">断开</a-button>
          <a-popconfirm title="刷新串口将断开连接，是否继续" ok-text="是" cancel-text="否"  @confirm="flushSerial">
            <a-button type="primary" html-type="submit">刷新</a-button>
          </a-popconfirm>
          <a-button type="primary" html-type="submit" @click="open">开始采集</a-button>
          <a-input v-model:value="weight"></a-input>
        </a-space>
      </a-form-item>
    </a-form>

    <a-form
        :model="sampleQueryParams"
        ref="sampleQueryFormRef"
        layout="inline"
        autocomplete="off"
    >
      <a-space direction="vertical">
        <a-space style="width: 100%;" align="start">
          <a-form-item
              name="receiveSampleDate"
          >
            <compact>
              <template #addon>
                接样日期
              </template>
              <a-date-picker v-model:value="sampleQueryParams.receiveSampleDate"/>
            </compact>
          </a-form-item>
          <a-form-item
              name="sampleBarcode"
              :rules="[{ required: true, message: '请输入样品条码' }]"
          >
            <a-input v-model:value="sampleQueryParams.sampleBarcode" addon-before="样品条码"/>
          </a-form-item>
          <a-form-item
              name="lab"
          >
            <a-input v-model:value="sampleQueryParams.lab" addon-before="实验室"/>
          </a-form-item>
          <a-form-item
              name="sampleType"
          >
            <a-input v-model:value="sampleQueryParams.sampleType" addon-before="样品类型"/>
          </a-form-item>
          <a-form-item
              name="sampleName"
          >
            <compact>
              <template #addon>
                样品名称
              </template>
              <a-select
                  ref="select"
                  style="width: 120px"
                  placeholder="选择样品名称"
                  v-model:value="sampleQueryParams.sampleName"
              >
              </a-select>
            </compact>


          </a-form-item>
        </a-space>
        <a-space style="width: 100%;" align="start">
          <a-form-item
              name="factory"
          >
            <compact>
              <template #addon>
                工厂
              </template>
              <a-select
                  ref="select"
                  style="width: 120px"
                  placeholder="选择工厂"
                  v-model:value="sampleQueryParams.factory"
              >
              </a-select>
            </compact>
          </a-form-item>
          <a-form-item
              name="samplePoint"
          >
            <a-input v-model:value="sampleQueryParams.samplePoint" addon-before="采样点"/>
          </a-form-item>
          <a-form-item
              name="installLocation"
          >
            <compact>
              <template #addon>
                设施设备及房间
              </template>
              <a-select
                  ref="select"
                  style="width: 120px"
                  placeholder="选择设施设备及房间"
                  v-model:value="sampleQueryParams.installLocation"
              >
              </a-select>
            </compact>
          </a-form-item>
          <a-form-item
              name="entryStatus"
              :rules="[{ required: true, message: '请选择录入状态' }]"
          >
            <compact>
              <template #addon>
                录入状态
              </template>
              <a-select
                  ref="select"
                  style="width: 120px"
                  placeholder="选择录入状态"
                  v-model:value="sampleQueryParams.entryStatus"
              >
                <a-select-option :value="0">未录入</a-select-option>
                <a-select-option :value="1">已录入</a-select-option>
                <a-select-option :value="2">全部</a-select-option>
              </a-select>
            </compact>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" @click="getProject">加载项目</a-button>
          </a-form-item>
        </a-space>

      </a-space>
    </a-form>

    <a-form
        :model="projectQueryParams"
        ref="projectQueryRef"
        layout="inline"
        autocomplete="off"
    >
      <a-space direction="vertical">
        <a-space style="width: 100%;" align="start">
          <a-form-item
              name="assayProject"
              :rules="[{ required: true, message: '请选择检验项目' }]"
          >
            <compact>
              <template #addon>
                检验项目
              </template>
              <a-select
                  ref="select"
                  style="width: 800px"
                  placeholder="选择检验项目"
                  v-model:value="projectQueryParams.assayProject"
                  @change="projectChange"
              >
                <a-select-option v-for="item in projectList" :value="item.inspectItem">{{item.inspectItemId}}</a-select-option>
              </a-select>
            </compact>
          </a-form-item>
        </a-space>
        <a-space style="width: 100%;" align="start">
          <a-form-item
              name="assayWay"
              :rules="[{ required: true, message: '请选择检验方法' }]"
          >
            <compact>
              <template #addon>
                检验方法
              </template>
              <a-select
                  ref="select"
                  style="width: 800px"
                  placeholder="选择检验方法"
                  v-model:value="projectQueryParams.assayWay"
              >
                <a-select-option v-for="item in wayList" :value="item.inspectMethod">{{item.inspectMethodId}}</a-select-option>
              </a-select>
            </compact>
          </a-form-item>
        </a-space>
        <a-space style="width: 100%;" align="start">
          <a-button type="primary" @click="chooseSample">接样</a-button>
        </a-space>
      </a-space>
    </a-form>

    <a-modal v-model:open="chooseSampleOpen" title="接样">
    </a-modal>

    <a-space style="width: 100%;" direction="vertical">
      <a-form
          :model="examineQueryParams"
          layout="inline"
          autocomplete="off"
      >
            <a-form-item
                label="天平核查结果"
                name="deviceActive"
            >
              <a-select
                  ref="select"
                  style="width: 120px"
                  placeholder="选择天平核查结果"
                  v-model:value="examineQueryParams.deviceActive"
              >
                <a-select-option value="jack">Jack</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
                label=结果计算方式
                name="calcType"
            >
              <a-select
                  ref="select"
                  style="width: 120px"
                  placeholder="选择结果计算方式"
                  v-model:value="examineQueryParams.calcType"
              >
                <a-select-option value="jack">Jack</a-select-option>
              </a-select>
            </a-form-item>
      </a-form>
      <a-tabs v-model:activeKey="activeTab" centered>
        <a-tab-pane key="1" tab="任务1">
          <a-table bordered :data-source="taskList" :columns="taskColumns">
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'name'">
                <div class="editable-cell">
                  <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                    <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
                    <a-button class="editable-cell-icon-check" @click="save(record.key)" />
                  </div>
                  <div v-else class="editable-cell-text-wrapper">
                    {{ text || '--' }}
                    <a-button @click="edit(record.key)" />
                  </div>
                </div>
              </template>
              <template v-else-if="column.dataIndex === 'operation'">
                <a-popconfirm
                    v-if="dataSource.length"
                    title="Sure to delete?"
                    @confirm="onDelete(record.key)"
                >
                  <a>Delete</a>
                </a-popconfirm>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-space>
  </div>
</template>
<script setup>
import {ref, onMounted, reactive} from 'vue';
import {ipcApiRoute} from "@/api/main";
import {ipc} from '@/utils/ipcRenderer';
import {message} from 'ant-design-vue';
import Compact from "@/components/global/compact.vue";
import {cloneDeep} from "lodash";

const deviceQueryParams = ref({
  device: null,
  deviceCode: null,
  serialPort: null,
})
const deviceFormRef = ref();
const sampleQueryFormRef = ref();
const projectQueryRef = ref();
const deviceList = ref([])
const deviceCodeList = ref([])
const serialPortList = ref([])
const isConnect= ref(false)
const weight = ref(0)
onMounted(() => {
  getSerialPortList()
  getDeviceList()
  getUserInfo()
  init()
})

const getUserInfo = ()=>{
  ipc.request(ipcApiRoute.getUserInfo,{}).then(data=>{
  })
}
const getDeviceList = ()=>{
  ipc.request(ipcApiRoute.getDevice, {}).then(data => {
    deviceList.value = data
  })
}

const flushSerial = ()=>{
  close()
  getSerialPortList()
}
const getSerialPortList = () => {
  ipc.request(ipcApiRoute.getSerialPortList, {}).then(data => {
    serialPortList.value = data
  })
}

const connect = () => {
  deviceFormRef.value
      .validate()
      .then(()=>{
        ipc.request(ipcApiRoute.connect, {path: deviceQueryParams.value.serialPort}).then(data => {
          isConnect.value = true
          message.success('连接成功');
        })
      })
}

const close = () => {
  ipc.request(ipcApiRoute.close).then(data => {
    isConnect.value = false
    message.success('断开成功');
  })
}



const open = () => {
  ipc.request(ipcApiRoute.open)
}



const receiveListen = () => {
  ipc.removeAllListeners(ipcApiRoute.receive);
  ipc.on(ipcApiRoute.receive, (event, result) => {
    console.log(result)
    weight.value = result

  })
}
const errorListen = () => {
  ipc.removeAllListeners(ipcApiRoute.error);
  ipc.on(ipcApiRoute.error, (event, result) => {
    isConnect.value = false
    message.success('串口断开');
  })
}
const closeListen = () => {
  ipc.removeAllListeners(ipcApiRoute.close);
  ipc.on(ipcApiRoute.close, (event, result) => {
    isConnect.value = false
    message.success('串口关闭');
  })
}

const init = () => {
  receiveListen()
  errorListen()
  closeListen()
}


const sampleQueryParams = ref({
  receiveSampleDate:null,
  sampleBarcode:"240612123620240480100001",
  lab:null,
  sampleType:null,
  sampleName:null,
  factory:null,
  samplePoint:null,
  installLocation:null,
  entryStatus:0
})

const projectList = ref([])

const getProject = ()=>{
  sampleQueryFormRef.value.validate().then(()=>{
    ipc.request(ipcApiRoute.getAssayProject,{barCode:sampleQueryParams.value.sampleBarcode,valType:sampleQueryParams.value.entryStatus}).then(data => {
      projectList.value = data.inspectItemList
    })
  })
}

const wayList = ref([])
const projectChange = (value)=>{
  sampleQueryFormRef.value.validate().then(()=>{
    ipc.request(ipcApiRoute.getAssayWay,{barCode:sampleQueryParams.value.sampleBarcode,valType:sampleQueryParams.value.entryStatus,inspectItem:projectQueryParams.value.assayProject}).then(data => {
      wayList.value = data.inspectMethodList
    })
  })

}

const projectQueryParams = ref({
  assayProject: null,
  assayWay: null,
})

const chooseSampleOpen = ref(false)
const chooseSample = ()=>{
  projectQueryRef.value
      .validate()
      .then(()=>{
        sampleQueryFormRef.value
            .validate()
            .then(()=>{
          ipc.request(ipcApiRoute.getSample,{barCode:sampleQueryParams.value.sampleBarcode,valType:sampleQueryParams.value.entryStatus,inspectItem:projectQueryParams.value.assayProject,inspectMethod:projectQueryParams.value.assayWay}).then(data => {
            console.log(data)
            chooseSampleOpen.value = true
          })
        })
      })
}


const examineQueryParams = ref({
  device: null,
  deviceCode: null,
  serialPort: null,
})
const activeTab = ref('1')
const editableData = reactive({});
const edit = key => {
  editableData[key] = cloneDeep(taskList.value.filter(item => key === item.key)[0]);
};
const save = key => {
  Object.assign(taskList.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const taskList = ref([
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
])
const taskColumns = ref([
  {
    title: '样品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '样品条码',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '样品批次',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '样品种类',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '样重',
    dataIndex: 'address',
    key: 'address',
  },
])
</script>
<style scoped>
.container {
  padding: 10px;
}
</style>
