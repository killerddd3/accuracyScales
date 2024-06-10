<script setup>
import { computed, ref,defineProps } from 'vue'
import { Icon } from '@iconify/vue'

import antIcon from '@ant-design/icons-vue';

const props = defineProps({
  icon:{
    type: String,
    required: true
  },
  color:{
    type: String,
    default: ''
  },
  size:{
    type: Number,
    default: 14
  }
})
// 判断是否是本地图标
const isLocal = computed(() => props.icon.startsWith('svg-icon:'))

// 如果是本地图标拆分出 svg-icon: 后面的字段
const symbolId = computed(() => {
  return isLocal.value ? `#icon-${props.icon.split('svg-icon:')[1]}` : props.icon
})

// 设置 Iconify 样式
const getIconifyStyle = computed(() => {
  const { color, size } = props
  return {
    fontSize: `${size}px`,
    color
  }
})

const getSvgStyle = computed(() => {
  const { color, size } = props
  return {
    width:`${size}px`,
    height:`${size}px`,
    fontSize: `${size}px`,
    fill:'currentColor',
    color
  }
})
</script>

<template>
  <ant-icon>
    <template #component>
      <svg v-if="isLocal" aria-hidden="true" :style="getSvgStyle">
        <use :xlink:href="symbolId"/>
      </svg>
      <icon v-else :icon="symbolId" :style="getIconifyStyle" />
    </template>
  </ant-icon>
</template>
