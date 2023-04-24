<template>
  <button @click="onClick">121</button>
</template>

<script lang="ts" setup>
import { useMessageBox } from '@/hooks/useMessageBox'
import { ElMessage } from 'element-plus'

const { setMessageBox } = useMessageBox()

const mockRequest = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

function onClick() {
  setMessageBox({
    isHtml: true,
    content: `<span class="block h-[58px]">
        确定将该用户密码重置为
        <span class="text-primary">abcd.1234</span>
        吗？
      </span>`,
    title: '提示',
    async submit() {
      try {
        await mockRequest(1000)
        ElMessage.success('重置成功')

        setMessageBox({ visible: false })
      } finally {
        setMessageBox({ loading: false })
      }
    },
  })
}
</script>
