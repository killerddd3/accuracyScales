<script setup>
import {ref} from "vue";
import {RouterView} from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const locale = ref(zhCN)
</script>

<template>
  <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#07C160',
          colorLink:'#1890ff',
          colorSuccess:'#52c41a',
          colorWarning:'#faad14',
          colorError:'#f5222d',
          borderRadius:'4px',
          colorText:'rgba(0, 0, 0, 0.65)',
          colorTextSecondary:'rgba(0, 0, 0, 0.45)',
          colorTextDisabled:'rgba(0, 0, 0, 0.25)',
          colorBgContainerDisabled:'rgba(0, 0, 0, 0.25)',
          colorTextHeading: 'rgba(0, 0, 0, 0.85)',
          colorBorder:'#dce3e8',
          boxShadow:'0 2px 8px rgba(0, 0, 0, 0.15)',
        }
      }"
      :locale="locale"
  >
    <RouterView/>
  </a-config-provider>
</template>

<style scoped>
</style>
