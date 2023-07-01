<template>
  <div v-for="item in containerList" :key="item.name">
    <div @click="routeToTorrentManager(item.name)">{{ item.name }}</div>
  </div>
</template>

<script setup lang="ts">
import {Container} from '@/store/container/container'
import {useContainerMapStore} from '@/store/container/container'
import {computed} from 'vue'
import {useRouter} from 'vue-router'

const containerStore = useContainerMapStore()
const containerList = computed<Container[]>(() => {
  return Object.values(containerStore.containerMap)
})

const router = useRouter()
const routeToTorrentManager = (containerName: string) => {
  router.push({
    name: 'torrent-manager',
    params: {
      containerName
    }
  })
}
</script>