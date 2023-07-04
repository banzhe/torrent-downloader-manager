<template>
  <div>{{ containerStatistics }}</div>
  <n-card title="基本信息" header-style="text-align: left">
    <ContainerSpeed
        :uploadSpeed="containerStatistics.uploadSpeed"
        :downloadSpeed="containerStatistics.downloadSpeed">
    </ContainerSpeed>
  </n-card>
</template>

<script setup lang="ts">
import {getSessionStatistics} from '@/request/transmissionRequest.ts'
import {onBeforeMount, ref} from 'vue'
import {onBeforeRouteLeave} from 'vue-router'
import ContainerSpeed from '@/views/TorrentManager/components/ContainerSpeed.vue'


const props = defineProps({
  containerName: {
    type: String,
    required: true
  }
})

const containerStatistics = ref({
  'activeTorrentCount': 0,
  'cumulative-stats': {
    'downloadedBytes': 0,
    'filesAdded': 0,
    'secondsActive': 0,
    'sessionCount': 1,
    'uploadedBytes': 0
  },
  'current-stats': {
    'downloadedBytes': 0,
    'filesAdded': 0,
    'secondsActive': 0,
    'sessionCount': 1,
    'uploadedBytes': 0
  },
  'downloadSpeed': 0,
  'pausedTorrentCount': 0,
  'torrentCount': 0,
  'uploadSpeed': 0
})
const refreshSessionStatistics = async () => {
  const sessionStatisticsInterval = setInterval(() => {
    // todo 如何解决发送顺序问题
    getSessionStatistics(props.containerName.toString()).then(response => {
      containerStatistics.value = response.data.arguments
    })
  }, 2000)
  onBeforeRouteLeave(() => {
    clearInterval(sessionStatisticsInterval)
  })
}
onBeforeMount(refreshSessionStatistics)

</script>