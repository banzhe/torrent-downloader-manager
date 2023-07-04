<template>
  <div>
    <div class="speedBox">
      <n-icon color="green">
        <ArrowSortUp16Regular/>
      </n-icon>
      <span>{{ showUploadSpeed }}</span>
    </div>
    <div class="speedBox">
      <n-icon color="red">
        <ArrowSortDown16Regular/>
      </n-icon>
      <span>{{ showDownloadSpeed }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowSortDown16Regular from '@vicons/fluent/ArrowSortDown16Regular'
import ArrowSortUp16Regular from '@vicons/fluent/ArrowSortUp16Regular'
import {computed} from 'vue'

const props = defineProps({
  downloadSpeed: {
    type: Number,
    default: 0
  },
  uploadSpeed: {
    type: Number,
    default: 0
  }
})

const showUploadSpeed = computed(() => {
  if (props.uploadSpeed < 1000) {
    return `${(props.uploadSpeed / 1000).toFixed(2)} KB/s`
  } else {
    return `${(props.uploadSpeed / 1000 / 1024).toFixed(2)} MB/s`
  }
})

const showDownloadSpeed = computed(() => {
  if (props.downloadSpeed < 1000) {
    return `${(props.downloadSpeed / 1000).toFixed(2)} KB/s`
  } else {
    return `${(props.downloadSpeed / 1000 / 1024).toFixed(2)} MB/s`
  }
})
</script>

<style scoped>
.speedBox {
  line-height: 1.2;
  display: flex;
  justify-content: center;
}
</style>