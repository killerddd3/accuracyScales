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
          <a-button type="primary" @click="chooseSample">批量接样</a-button>
          <a-button type="primary" @click="chooseOneSample">接样</a-button>
        </a-space>
      </a-space>
    </a-form>

    <a-modal v-model:open="chooseSampleOpen" width="960px" title="接样" ok-text="提交" cancel-text="取消" :destroyOnClose="true" :after-close="closeChooseSample" @ok="commitSample">
      <a-space direction="vertical">
        <a-form
            ref="chooseSampleRef"
            :model="chooseSampleParams"
            layout="inline"
            autocomplete="off"
        >
          <a-form-item
              label=""
              name="barCode"
              :rules="[{ required: true, message: '请输入样品条码' }]"
          >
            <a-input v-model:value="chooseSampleParams.barCode" addon-before="样品条码"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" @click="getSample">接收样品</a-button>
          </a-form-item>
        </a-form>
        <a-table bordered :pagination="false" :data-source="sampleList" :columns="sampleColumns">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a-popconfirm
                  v-if="sampleList.length>0"
                  title="是否删除样品?"
                  ok-text="是" cancel-text="否"
                  @confirm="onDelete(record.sampleBarCode)"
              >
                <a-button type="primary">删除</a-button>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </a-space>
    </a-modal>

    <a-space style="width: 100%;margin-top: 10px" direction="vertical">
      <a-form
          :model="examineQueryParams"
          ref="examineQueryRef"
          layout="inline"
          autocomplete="off"
      >
            <a-form-item
                label="天平核查结果"
                name="deviceActive"
                :rules="[{ required: true, message: '请选择天平核查结果' }]"
            >
              <a-select
                  ref="select"
                  style="width: 120px"
                  placeholder="选择天平核查结果"
                  v-model:value="examineQueryParams.deviceActive"
              >
                <a-select-option v-for="item in deviceActiveList" :value="item.value">{{item.label}}</a-select-option>
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
                <a-select-option v-for="item in calcTypeList" :value="item.value">{{item.label}}</a-select-option>
              </a-select>
            </a-form-item>
      </a-form>
      <a-tabs v-model:activeKey="activeTab" centered @change="tabChange">
        <a-tab-pane v-for="(item,index) in tabList" :key="item.sampleBarCode" :tab="`任务${index+1}`">
          <a-table bordered :pagination="false" :data-source="[item]" :columns="taskColumns">
            <template #bodyCell="{ column, text, record,index }">
              <template v-if="needColums.includes(column.dataIndex)">
                <div class="collect-cell">
                  <div v-if="editableData[item.sampleBarCode] && editableData[item.sampleBarCode][index]">
                    <a-flex justify="center" align="center" gap="middle">
                      <span>{{editableData[item.sampleBarCode][index][column.dataIndex]}}</span>
                      <svg-icon-font :icon="'svg-icon:stop'" class="collect-btn" :size="36" :color="'#f5222d'" @click="sendSmapleSave()"/>
                    </a-flex>
                  </div>
                  <div v-else>
                    <a-flex justify="center" align="center" gap="middle">
                      <span>{{ text }}</span>
                      <svg-icon-font :icon="'svg-icon:start'" class="collect-btn" :size="36" :color="'#07C160'" @click="sendSmapleEdit(item.sampleBarCode,index,column.dataIndex)"/>
                    </a-flex>
                  </div>
                </div>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
      <a-space>
        <a-button type="primary" html-type="submit" @click="tempSave">暂存</a-button>
        <a-button type="primary" html-type="submit" @click="sendSample">提交</a-button>
      </a-space>
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
import SvgIconFont from "@/components/global/SvgIconFont.vue";
import useUserStore from "@/store/modules/user";
import numbro from "numbro";
const deviceQueryParams = ref({
  device: null,
  deviceCode: null,
  serialPort: null,
})
const deviceFormRef = ref();
const sampleQueryFormRef = ref();
const chooseSampleRef = ref();
const projectQueryRef = ref();
const examineQueryRef = ref();
const deviceList = ref([])
const deviceCodeList = ref([])
const serialPortList = ref([])
const isConnect= ref(false)
const isCollect= ref(false)
onMounted(() => {
  getSerialPortList()
  getDeviceList()
  init()
})

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
  ipc.request(ipcApiRoute.open).then(data=>{
    isCollect.value = true
  })
}
const stop = () => {
  ipc.request(ipcApiRoute.stop).then(data=>{

  })
}

//TODO 封装ipc.on
const receiveListen = () => {
  ipc.removeAllListeners(ipcApiRoute.receive);
  ipc.on(ipcApiRoute.receive, (event, result) => {
    if(result.code === 200){
      if(isCollect.value){
        const weight = numbro.unformat(result.data.replace('g',''))
        editableData.value[activeTab.value][activeTableRow.value][activeProp.value] = weight
      }
    }else{
      message.error(result.message)
    }

  })
}
const errorListen = () => {
  ipc.removeAllListeners(ipcApiRoute.error);
  ipc.on(ipcApiRoute.error, (event, result) => {
    isConnect.value = false
    flushSerial()
    if(isCollect.value){
      sendSmapleSave()
    }
    message.error('设备丢失');
  })
}
const closeListen = () => {
  ipc.removeAllListeners(ipcApiRoute.close);
  ipc.on(ipcApiRoute.close, (event, result) => {
    console.log("关闭",isCollect.value)
    if(isCollect.value){
      sendSmapleSave()
    }
    message.error('串口关闭');
  })
}

const init = () => {
  receiveListen()
  errorListen()
  closeListen()
}


const sampleQueryParams = ref({
  receiveSampleDate:null,
  sampleBarcode:null,
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
      if(data.inspectMethodList.length>0){
        wayList.value = data.inspectMethodList
        projectQueryParams.value.assayWay = data.inspectMethodList[0].inspectMethod
      }
    })
  })

}

const projectQueryParams = ref({
  assayProject: null,
  assayWay: null,
})

const chooseSampleOpen = ref(false)
const chooseSampleParams = ref({
  barCode:null,
})
const chooseSample = ()=>{
  projectQueryRef.value
      .validate()
      .then(()=>{
        sampleQueryFormRef.value
            .validate()
            .then(()=>{
            chooseSampleOpen.value = true
        })
      })
}
const chooseOneSample = ()=>{
  projectQueryRef.value
      .validate()
      .then(()=>{
        sampleQueryFormRef.value
            .validate()
            .then(()=>{
              ipc.request(ipcApiRoute.getSample,{
                barCode:sampleQueryParams.value.sampleBarcode,
                valType:sampleQueryParams.value.entryStatus,
                inspectItem:projectQueryParams.value.assayProject,
                inspectMethod:projectQueryParams.value.assayWay,
                barCodeJ:sampleQueryParams.value.sampleBarcode
              }).then(data => {
                const result = {
                  sampleType:data.sample.sampleClassText,
                  sampleName:data.sample.sampleName,
                  sampleBarCode:data.sample.barCode,
                  sampleCode:data.sample.entrustOrder,
                  sampleBatchNum:data.sample.batchNum,
                  pkId:data.sample.pkId,
                  assayProject:data.sample.inspectItem,
                  assayWay:projectQueryParams.value.assayWay
                }
                ipc.request(ipcApiRoute.commitSample,{
                  inspectMethodUsing: projectQueryParams.value.assayWay,
                  barCodeJ: result.sampleBarCode,
                  receiveSamplePkId: result.pkId,
                  existCod:result.sampleBarCode,
                  inspectItem: result.assayProject
                }).then(innerData=>{
                  const currentList = tabList.value.map(item=>item.sampleBarCode)
                  if(currentList.includes(result.sampleBarCode)){
                    return message.warn(`样品条码:${result.sampleBarCode}重复`)
                  }
                  const copyList = [result]
                  const valueList = innerData.editData.mdmOriginalRecordMethodList.filter(item=>{
                    return item.source === '天平'
                  })
                  valueList.forEach(item=>{
                    taskColumns.value.push({
                      title: item.nam,
                      dataIndex: item.abbreviation,
                      key: item.abbreviation,
                      width: 120
                    })
                    needColums.value.push(item.abbreviation)
                    copyList.forEach(inner=>{
                      inner[item.abbreviation] = 0
                    })
                  })
                  tabList.value = copyList
                  activeTab.value = copyList[0].sampleBarCode
                  tabChange(activeTab.value)
                })
              })
            })
      })
}
const closeChooseSample = ()=>{
  sampleList.value = []
  chooseSampleParams.value.barCode = null
}
const commitSample = ()=>{
  if( sampleList.value.length === 0) return message.warn("请至少添加一个样品")
  const receiveSamplePkId = sampleList.value.map(item=>{
    return item.pkId;
  })
  const existCod = sampleList.value.map(item=>{
    return item.sampleBarCode;
  })
  const inspectItem = sampleList.value.map(item=>{
    return item.assayProject;
  })
  ipc.request(ipcApiRoute.commitSample,{
    inspectMethodUsing: projectQueryParams.value.assayWay,
    barCodeJ: chooseSampleParams.value.barCode,
    receiveSamplePkId: receiveSamplePkId,
    existCod:existCod,
    inspectItem: inspectItem
  }).then(data=>{
    const currentList = tabList.value.map(item=>item.sampleBarCode)
    const addList = sampleList.value.map(item=>item.sampleBarCode)
    const repeatList = addList.filter((x)=>{
      return currentList.includes(x)
    })

    if(repeatList.length>0){
      return message.warn(`样品条码:${repeatList.join(",")}重复`)
    }
    const copyList = sampleList.value
    const valueList = data.editData.mdmOriginalRecordMethodList.filter(item=>{
      return item.source === '天平'
    })
    valueList.forEach(item=>{
      taskColumns.value.push({
        title: item.nam,
        dataIndex: item.abbreviation,
        key: item.abbreviation,
        width: 120
      })
      needColums.value.push(item.abbreviation)
      copyList.forEach(inner=>{
        inner[item.abbreviation] = 0
      })
    })
    tabList.value = copyList
    activeTab.value = copyList[0].sampleBarCode
    tabChange(activeTab.value)
    chooseSampleOpen.value = false
  })
}
const getSample = ()=>{
  chooseSampleRef.value.validate().then(()=>{
    ipc.request(ipcApiRoute.getSample,{
      barCode:sampleQueryParams.value.sampleBarcode,
      valType:sampleQueryParams.value.entryStatus,
      inspectItem:projectQueryParams.value.assayProject,
      inspectMethod:projectQueryParams.value.assayWay,
      barCodeJ:chooseSampleParams.value.barCode
    }).then(data => {
      const result = {
        sampleType:data.sample.sampleClassText,
        sampleName:data.sample.sampleName,
        sampleBarCode:data.sample.barCode,
        sampleCode:data.sample.entrustOrder,
        sampleBatchNum:data.sample.batchNum,
        pkId:data.sample.pkId,
        assayProject:data.sample.inspectItem,
        assayWay:projectQueryParams.value.assayWay
      }
      if(sampleList.value.some(item=>item.sampleBarCode === result.sampleBarCode)){
        return message.warn("请勿重复添加")
      }
      sampleList.value.push(result)
    })
  })
}
const onDelete = (sampleBarCode)=>{
  sampleList.value = sampleList.value.filter(item => item.sampleBarCode !== sampleBarCode);
}
const sampleList = ref([])
const sampleColumns = ref([
  {
    title: '样品种类',
    dataIndex: 'sampleType',
    key: 'sampleType',
    width: 120
  },
  {
    title: '样品名称',
    dataIndex: 'sampleName',
    key: 'sampleName',
    width: 240

  },
  {
    title: '样品条码',
    dataIndex: 'sampleBarCode',
    key: 'sampleBarCode',
    width: 240
  },
  {
    title: '样品编码',
    dataIndex: 'sampleCode',
    key: 'sampleCode',
    width: 160
  },
  {
    title: '样品批次',
    dataIndex: 'sampleBatchNum',
    key: 'sampleBatchNum',
    width: 120
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 80
  }
])

const examineQueryParams = ref({
  deviceActive: 'ACTIVE',
  calcType: null,
})
const activeTab = ref(null)
const activeTableRow = ref(null)
const activeProp = ref(null)
const editableData = ref({});
const tabChange = (value)=>{
  editableData.value = {
    [value]:{}
  }
}
const sendSmapleEdit = (tabKey,tableIndex,dataIndex) => {
  if(!isConnect.value) return message.warn("请先连接串口")
  editableData.value[tabKey][tableIndex] = cloneDeep(tabList.value.filter(item => tabKey === item.sampleBarCode)[tableIndex]);
  activeTableRow.value = tableIndex
  activeProp.value = dataIndex
  open()
};
const sendSmapleSave = ()  => {
  Object.assign(tabList.value.filter(item => activeTab.value === item.sampleBarCode)[activeTableRow.value], editableData.value[activeTab.value][activeTableRow.value]);
  delete editableData.value[activeTab.value][activeTableRow.value];
  activeTableRow.value = null
  activeProp.value = null
  isCollect.value = false
  stop()
};

const deviceActiveList = ref([
  {
    value:"ACTIVE",
    label:"可用"
  },
  {
    value:"DISACTIVE",
    label:"不可用"
  }
])
const calcTypeList = ref([
  {
    value:"MIN",
    label:"最小值"
  },
  {
    value:"MAX",
    label:"最大值"
  },
  {
    value:"AVG",
    label:"平均值"
  }
])
const tabList = ref([])
const taskColumns = ref([
  {
    title: '样品种类',
    dataIndex: 'sampleType',
    key: 'sampleType',
    width: 120
  },
  {
    title: '样品名称',
    dataIndex: 'sampleName',
    key: 'sampleName',
    width: 200

  },
  {
    title: '样品条码',
    dataIndex: 'sampleBarCode',
    key: 'sampleBarCode',
    width: 240
  },
  {
    title: '样品批次',
    dataIndex: 'sampleBatchNum',
    key: 'sampleBatchNum',
    width: 120
  },
])
const needColums = ref([])

const tempSave = ()=>{

}
const userStore = useUserStore()
const sendSample = ()=>{

  examineQueryRef.value
      .validate()
      .then(()=>{
        if(isCollect.value) return message.warn("请先停止采集")
        const resultList = tabList.value.map(item=>{
          return {
            InspectionItems:item.assayProject,
            InspectionMethod:item.assayWay,
            Inspector:userStore.pkId,
            barCode:item.sampleBarCode,
            value:item[needColums.value[0]],
            standby1:'12'
          }
        })
        ipc.request(ipcApiRoute.sendSample,{data:resultList}).then(data=>{
          tabList.value = []
          message.success("提交成功")
        })
      })
}
</script>
<style scoped>
.container {
  padding: 10px;
}

.collect-cell{
  .collect-btn{
    visibility: hidden;
  }
}

.collect-cell:hover{
  .collect-btn{
    visibility: visible;
  }
}
</style>
