<template>
  <icon-font :type="props.type"/>
</template>
<script setup>
import {createFromIconfontCN} from "@ant-design/icons-vue";
import {defineProps} from 'vue'

const props = defineProps(['type'])

const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/c/font_4579905_bvpyckgg9sl.js',
  extraCommonProps: {
    style: {
      fontSize: '18px',
    },
  },
})
</script>

<style scoped>

</style>
