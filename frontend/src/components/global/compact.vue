<template>
  <a-input-group compact>
          <span class="ant-input-group-wrapper" style="width: 100%">
            <span class="ant-input-wrapper ant-input-group" style="display: table;">
              <span class="ant-input-group-addon">
                <slot name="addon"></slot>
              </span>
              <slot name="default"></slot>
            </span>
          </span>
  </a-input-group>

</template>

<script setup>

</script>

<style scoped>

</style>
