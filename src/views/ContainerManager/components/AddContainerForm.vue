<template>
  <n-form
      ref="formRef"
      inline
      :label-width="80"
      :model="formValue"
      label-placement="left"
      :rules="rules"
      size="small">
    <n-space vertical>
      <n-form-item label="容器名" path="name">
        <n-input v-model:value="formValue.name" placeholder="容器名"/>
      </n-form-item>
      <n-form-item label="容器类型" path="type">
        <n-select v-model:value="formValue.type" :options="options"></n-select>
      </n-form-item>
      <n-form-item label="api链接" path="url">
        <n-input v-model:value="formValue.url" placeholder="api链接"/>
      </n-form-item>
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="formValue.username" placeholder="用户名"/>
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="formValue.password" placeholder="密码"/>
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="addNewContainer">
          添加容器
        </n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {FormInst} from 'naive-ui'
import {Container, useContainerMapStore} from '@/store/container/container'
import {ContainerTypeEnum} from '@/enums/containerTypeEnum.ts'
import {storeToRefs} from 'pinia'

const formRef = ref<FormInst | null>(null)
const initFormData: Container = {
  name: '',
  password: '',
  sort: 0,
  transmissionSessionId: '',
  type: ContainerTypeEnum.transmission,
  url: '',
  username: ''
}
const formValue = ref({...initFormData})
const rules = {
  name: [
    {
      required: true,
      message: '请输入名称',
      trigger: ['input']
    }
  ],
  url: {
    required: true,
    message: '请输入url',
    trigger: ['input']
  }
}

const addNewContainer = () => {
  const containerStore = useContainerMapStore()
  const {containerMap} = storeToRefs(containerStore)
  containerMap.value[formValue.value.name] = {...formValue.value}
  resetForm()
}

const resetForm = () => {
  formValue.value = {...initFormData}
}

const options = [
  {
    label: 'Transmission',
    value: ContainerTypeEnum.transmission
  },
  {
    label: 'qBitTorrent',
    value: ContainerTypeEnum.qBitTorrent
  },
]
</script>