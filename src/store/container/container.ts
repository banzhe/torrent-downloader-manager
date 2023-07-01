import {defineStore} from 'pinia'
import {ContainerTypeEnum} from '@/enums/containerTypeEnum.ts'
import {Ref, ref} from 'vue'

export type Container = {
  type: ContainerTypeEnum,
  username?: string,
  password?: string,
  url: string,
  name: string,
  transmissionSessionId?: string,
  sort: number
}

export const useContainerMapStore = defineStore(
  'containerMapId',
  () => {
    const containerMap: Ref<{ [key: string]: Container }> = ref({})
    return {containerMap}
  }, {
    persist: true
  }
)
