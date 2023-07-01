<template>
  <div>{{ containerStatistics }}</div>
</template>

<script setup lang="ts">
import {getSessionStatistics} from '@/request/transmissionRequest.ts'
import {onBeforeMount, ref} from 'vue'

const props = defineProps({
  containerName: {
    type: String,
    required: true
  }
})

const containerStatistics = ref<{
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
}>()
const refreshSessionStatistics = async () => {
  setInterval(() => {
    // todo 如何解决发送顺序问题
    getSessionStatistics(props.containerName.toString()).then(response => {
      containerStatistics.value = response.data.arguments
    })
  }, 2000)
}
onBeforeMount(refreshSessionStatistics)

</script>