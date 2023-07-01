<template>
  <n-layout class="layout" has-sider>
    <n-layout-sider class="layoutLeft" content-style="padding: 24px;">
      <ContainerSideBar></ContainerSideBar>
    </n-layout-sider>
    <n-layout-content class="layoutContainer" content-style="padding: 24px;">
      <router-view></router-view>
    </n-layout-content>
  </n-layout>
</template>

<style scoped>
.layout {
  width: 100%;
}

.layoutLeft {
  width: 20%;
}

.layoutContainer {
  width: 80%;
}
</style>
<script setup lang="ts">
import ContainerSideBar from '@/components/ContainerSideBar.vue'
</script>